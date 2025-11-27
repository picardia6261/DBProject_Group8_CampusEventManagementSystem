import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const conn = await db();
    const [rows] = await conn.query("SELECT * FROM organizer");
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
      `INSERT INTO organizer (OrgName, OrgPhone, OrgRole)
       VALUES (?, ?, ?)`,
      [b.OrgName, b.OrgPhone, b.OrgRole]
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
      `UPDATE organizer
       SET OrgName=?, OrgPhone=?, OrgRole=?
       WHERE OrgID=?`,
      [b.OrgName, b.OrgPhone, b.OrgRole, b.OrgID]
    );

    return NextResponse.json({ message: "Updated" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const id = new URL(req.url).searchParams.get("OrgID");
    const conn = await db();

    await conn.query("DELETE FROM organizer WHERE OrgID=?", [id]);

    return NextResponse.json({ message: "Deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
