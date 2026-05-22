import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { Inquiry } from "@/lib/models";
import { verifyToken } from "@/lib/auth";

// PUT - Update inquiry status
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
    const { status, adminNotes, quotedPrice } = body;

    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
    if (quotedPrice !== undefined) updateData.quotedPrice = quotedPrice;

    const inquiry = await Inquiry.findByIdAndUpdate(id, updateData, { new: true })
      .populate("user", "firstName lastName email")
      .lean();

    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
