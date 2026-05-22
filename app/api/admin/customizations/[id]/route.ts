import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { CustomizationRequest } from "@/lib/models";
import { verifyToken } from "@/lib/auth";

// PUT - Update customization request
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.headers.get("cookie")?.split("token=")[1]?.split(";")[0];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await dbConnect();

    const body = await request.json();
    const { status, adminNotes, estimatedPrice, estimatedDelivery } = body;

    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
    if (estimatedPrice !== undefined) updateData.estimatedPrice = estimatedPrice;
    if (estimatedDelivery !== undefined) updateData.estimatedDelivery = estimatedDelivery;

    const customization = await CustomizationRequest.findByIdAndUpdate(id, updateData, { new: true })
      .populate("user", "firstName lastName email")
      .populate("baseProduct", "name slug images")
      .lean();

    if (!customization) {
      return NextResponse.json({ error: "Customization request not found" }, { status: 404 });
    }

    return NextResponse.json(customization);
  } catch (error) {
    console.error("Error updating customization request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
