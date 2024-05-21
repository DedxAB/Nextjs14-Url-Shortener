import dbConnect from "@/db/mongodb";
import Url from "@/models/url.model";
import { NextResponse } from "next/server";

export const GET = async (_req, { params }) => {
  const { id } = params;
  try {
    await dbConnect();
    const url = await Url.findById(id);
    if (!url) {
      return NextResponse.json({ error: "URL not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "url found", data: url },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
