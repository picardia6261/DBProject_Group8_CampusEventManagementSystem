import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const conn = await db();
    const [rows] = await conn.query("SELECT * FROM venue");
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
      `INSERT INTO venue (VenueName, Location, Capacity)
       VALUES (?, ?, ?)`,
      [b.VenueName, b.VenueLocation, b.Capacity]
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
      `UPDATE venue
       SET VenueName=?, Location=?, Capacity=?
       WHERE VenueID=?`,
      [b.VenueName, b.VenueLocation, b.Capacity, b.VenueID]
    );

    return NextResponse.json({ message: "Updated" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const id = new URL(req.url).searchParams.get("VenueID");
    const conn = await db();

    await conn.query("DELETE FROM venue WHERE VenueID=?", [id]);

    return NextResponse.json({ message: "Deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
