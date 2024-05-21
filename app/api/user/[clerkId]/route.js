import dbConnect from "@/db/mongodb";
import Url from "@/models/url.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const GET = async (_req, { params }) => {
  const { clerkId } = params;
  try {
    await dbConnect();
    const user = await User.findOne({ clerkId: clerkId }).populate({
      path: "shortUrls",
      options: { sort: { createdAt: -1 } },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { data: user, message: "User found" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
