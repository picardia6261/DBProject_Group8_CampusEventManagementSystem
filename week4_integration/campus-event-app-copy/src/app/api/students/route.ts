import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const conn = await db();
    const [rows] = await conn.query("SELECT * FROM student");
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
      `INSERT INTO student (StudentName, StudentEmail, StudentPhone)
       VALUES (?, ?, ?)`,
      [b.StudentName, b.StudentEmail, b.StudentPhone]
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
      `UPDATE student
       SET StudentName=?, StudentEmail=?, StudentPhone=?
       WHERE StudentID=?`,
      [b.StudentName, b.StudentEmail, b.StudentPhone, b.StudentID]
    );

    return NextResponse.json({ message: "Updated" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const id = new URL(req.url).searchParams.get("StudentID");
    const conn = await db();

    await conn.query("DELETE FROM student WHERE StudentID=?", [id]);

    return NextResponse.json({ message: "Deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
