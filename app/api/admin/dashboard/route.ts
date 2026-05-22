import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Product, Inquiry, CustomizationRequest, User, Lead } from "@/lib/models";
import { verifyToken } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const token = request.headers.get("cookie")?.split("token=")[1]?.split(";")[0];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await dbConnect();

    // Aggregate statistics
    const [
      totalProducts,
      activeProducts,
      totalInquiries,
      pendingInquiries,
      totalCustomizations,
      pendingCustomizations,
      totalUsers,
      totalLeads,
      recentInquiries,
      recentCustomizations,
      productsByStore,
      inquiriesByStatus,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ status: "active" }),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: "pending" }),
      CustomizationRequest.countDocuments(),
      CustomizationRequest.countDocuments({ status: "pending" }),
      User.countDocuments(),
      Lead.countDocuments(),
      Inquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
      CustomizationRequest.find().sort({ createdAt: -1 }).limit(5).lean(),
      Product.aggregate([
        { $group: { _id: "$store", count: { $sum: 1 } } },
      ]),
      Inquiry.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
    ]);

    // Calculate revenue from completed inquiries (assuming average order value)
    const completedInquiries = await Inquiry.countDocuments({ status: "completed" });
    const estimatedRevenue = completedInquiries * 2500; // Estimated AOV

    return NextResponse.json({
      stats: {
        totalProducts,
        activeProducts,
        totalInquiries,
        pendingInquiries,
        totalCustomizations,
        pendingCustomizations,
        totalUsers,
        totalLeads,
        estimatedRevenue,
      },
      charts: {
        productsByStore,
        inquiriesByStatus,
      },
      recent: {
        inquiries: recentInquiries,
        customizations: recentCustomizations,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
