import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const conn = await db();
    const [rows] = await conn.query("SELECT * FROM event");
    return NextResponse.json(rows);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const conn = await db();

    await conn.query(
      `INSERT INTO event (OrgID, VenueID, EventName, EventStatus, Category, EventDate)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [b.OrgID, b.VenueID, b.EventName, b.EventStatus, b.Category, b.EventDate]
    );

    return NextResponse.json({ message: "Created" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const b = await req.json();
    const conn = await db();

    await conn.query(
      `UPDATE event
       SET OrgID=?, VenueID=?, EventName=?, EventStatus=?, Category=?, EventDate=?
       WHERE EventID=?`,
      [
        b.OrgID,
        b.VenueID,
        b.EventName,
        b.EventStatus,
        b.Category,
        b.EventDate,
        b.EventID,
      ]
    );

    return NextResponse.json({ message: "Updated" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const id = new URL(req.url).searchParams.get("EventID");
    const conn = await db();

    await conn.query("DELETE FROM event WHERE EventID=?", [id]);

    return NextResponse.json({ message: "Deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
