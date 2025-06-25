import dbConnect from "@/lib/dbConnect";
import { ensureUserModel } from "@/lib/ensureUserModel";
import EventModel from "@/model/EventModel";
import UserModel from "@/model/UserModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

ensureUserModel();

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    console.log("Registered models:", Object.keys(mongoose.models));
    console.log("User model exists:", !!mongoose.models.User);
    console.log("Event model exists:", !!mongoose.models.Event);

    const ename = req.nextUrl.searchParams.get("ename");
    if (!ename) {
      return NextResponse.json({ error: "Missing name" }, { status: 400 });
    }

    const event = await EventModel.findOne({ ename }).populate("registrations");
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({
      registrations: event.registrations,
      eventName: event.ename,
    });
  } catch (error) {
    console.error("Error fetching event registrations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
