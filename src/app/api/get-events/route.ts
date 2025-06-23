import dbConnect from "@/lib/dbConnect";
import EventModel from "@/model/EventModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const events = await EventModel.find().sort({ datetime: 1 });

    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
