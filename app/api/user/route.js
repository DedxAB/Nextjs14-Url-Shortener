import dbConnect from "@/db/mongodb";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { clerkId, name, email } = await req.json();

  try {
    await dbConnect();
    const newUser = await User.findOneAndUpdate(
      { clerkId },
      {
        clerkId,
        name,
        email,
        onboarded: true,
      },
      { upsert: true, new: true }
    );
    return NextResponse.json(
      { data: newUser, message: "User updated" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
