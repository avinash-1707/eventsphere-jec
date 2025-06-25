import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/UserModel";
import EventModel from "@/model/EventModel";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // Ensure DB is connected

    const { name, email, department, eventName } = await req.json();

    if (!name || !email || !department || !eventName) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check if user already exists by email
    let user = (await UserModel.findOne({ email })) as
      | typeof UserModel.prototype
      | null;

    if (!user) {
      // Create new user if not found
      user = (await UserModel.create({
        name,
        email,
        department,
      })) as typeof UserModel.prototype;
    }

    // Find the event by name
    const event = await EventModel.findOne({ ename: eventName });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Check if user already registered
    const isAlreadyRegistered = event.registrations.some(
      (u) => u.toString() === user._id.toString()
    );

    if (isAlreadyRegistered) {
      return NextResponse.json(
        { message: "User already registered for this event." },
        { status: 200 }
      );
    }

    // Register user to event
    event.registrations.push(user._id);
    await event.save();

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
