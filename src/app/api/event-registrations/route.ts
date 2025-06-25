import dbConnect from "@/lib/dbConnect";
import EventModel from "@/model/EventModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();
  const ename = req.nextUrl.searchParams.get("ename");
  if (!ename) {
    return NextResponse.json({ error: "Missing name" }, { status: 400 });
  }
  const event = await EventModel.findOne({ ename }).populate("registrations");
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
  console.log(event.registrations);
  return NextResponse.json({ registrations: event.registrations });
}
