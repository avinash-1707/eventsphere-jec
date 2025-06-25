import { NextRequest, NextResponse } from "next/server";
import EventModel from "@/model/EventModel";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { bannerUrl, ename, datetime, description } = body;

    if (!ename || !datetime || !description) {
      return NextResponse.json(
        { error: "ename, datetime, and description are required." },
        { status: 400 }
      );
    }

    const event = await EventModel.create({
      bannerUrl,
      ename,
      datetime,
      description,
      registrations: [],
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create event", details: (error as Error).message },
      { status: 500 }
    );
  }
}
