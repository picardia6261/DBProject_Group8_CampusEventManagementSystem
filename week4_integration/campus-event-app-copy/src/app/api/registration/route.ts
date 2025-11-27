import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET ALL
export async function GET() {
  try {
    const conn = await db();
    const [rows] = await conn.query("SELECT * FROM registration");
    return NextResponse.json(rows);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// CREATE
export async function POST(req: Request) {
  try {
    const b = await req.json();
    const conn = await db();

    const [eventRows]: any = await conn.query(
      "SELECT VenueID FROM event WHERE EventID=?",
      [b.EventID]
    );
    if (!eventRows.length) {
      return NextResponse.json({ error: "Event not found" }, { status: 400 });
    }

    const [venueRows]: any = await conn.query(
      "SELECT Capacity FROM venue WHERE VenueID=?",
      [eventRows[0].VenueID]
    );
    if (!venueRows.length) {
      return NextResponse.json(
        { error: "Venue not found for this event" },
        { status: 400 }
      );
    }

    const [countRows]: any = await conn.query(
      "SELECT COUNT(*) AS count FROM registration WHERE EventID=? AND RegStatus='Registered'",
      [b.EventID]
    );
    const currentRegistered = Number(countRows[0]?.count ?? 0);
    const capacity = Number(venueRows[0]?.Capacity);

    if (
      Number.isFinite(capacity) &&
      b.RegStatus === "Registered" &&
      currentRegistered >= capacity
    ) {
      return NextResponse.json(
        { error: "This event's venue is at capacity." },
        { status: 400 }
      );
    }

    await conn.query(
      `INSERT INTO registration (StudentID, EventID, RegDate, RegStatus)
       VALUES (?, ?, ?, ?)`,
      [b.StudentID, b.EventID, b.RegDate, b.RegStatus]
    );

    return NextResponse.json({ message: "Created" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// UPDATE (composite key)
export async function PUT(req: Request) {
  try {
    const b = await req.json();
    const conn = await db();

    if (b.RegStatus === "Registered") {
      const [existingRows]: any = await conn.query(
        "SELECT RegStatus FROM registration WHERE StudentID=? AND EventID=?",
        [b.StudentID, b.EventID]
      );
      const existing = existingRows[0];
      const alreadyRegistered = existing?.RegStatus === "Registered";

      const [eventRows]: any = await conn.query(
        "SELECT VenueID FROM event WHERE EventID=?",
        [b.EventID]
      );
      if (!eventRows.length) {
        return NextResponse.json({ error: "Event not found" }, { status: 400 });
      }

      const [venueRows]: any = await conn.query(
        "SELECT Capacity FROM venue WHERE VenueID=?",
        [eventRows[0].VenueID]
      );
      if (!venueRows.length) {
        return NextResponse.json(
          { error: "Venue not found for this event" },
          { status: 400 }
        );
      }

      const [countRows]: any = await conn.query(
        "SELECT COUNT(*) AS count FROM registration WHERE EventID=? AND RegStatus='Registered'",
        [b.EventID]
      );
      const currentRegistered = Number(countRows[0]?.count ?? 0);
      const capacity = Number(venueRows[0]?.Capacity);

      if (
        Number.isFinite(capacity) &&
        !alreadyRegistered &&
        currentRegistered >= capacity
      ) {
        return NextResponse.json(
          { error: "This event's venue is at capacity." },
          { status: 400 }
        );
      }
    }

    await conn.query(
      `UPDATE registration
       SET RegDate=?, RegStatus=?
       WHERE StudentID=? AND EventID=?`,
      [b.RegDate, b.RegStatus, b.StudentID, b.EventID]
    );

    return NextResponse.json({ message: "Updated" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE (composite key)
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const studentId = url.searchParams.get("StudentID");
    const eventId = url.searchParams.get("EventID");

    const conn = await db();
    await conn.query(
      "DELETE FROM registration WHERE StudentID=? AND EventID=?",
      [studentId, eventId]
    );

    return NextResponse.json({ message: "Deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
