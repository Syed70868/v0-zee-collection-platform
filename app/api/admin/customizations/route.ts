import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { CustomizationRequest } from "@/lib/models";
import { verifyToken } from "@/lib/auth";

// GET - List customization requests
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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");

    const query: Record<string, unknown> = {};
    if (status) query.status = status;

    const [requests, total] = await Promise.all([
      CustomizationRequest.find(query)
        .populate("user", "firstName lastName email")
        .populate("baseProduct", "name slug images")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      CustomizationRequest.countDocuments(query),
    ]);

    return NextResponse.json({
      requests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching customization requests:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
