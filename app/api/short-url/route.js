import dbConnect from "@/db/mongodb";
import { generateRandomString } from "@/helper/constants";
import Url from "@/models/url.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { originalUrl, user } = await req.json();
  try {
    await dbConnect();
    let shortUrl;
    let isUnique = false;
    while (!isUnique) {
      shortUrl = generateRandomString(6);
      const existingUrl = await Url.findOne({ shortUrl });
      if (!existingUrl) {
        isUnique = true;
      }
    }
    const newUrl = await Url.create({
      user,
      originalUrl,
      shortUrl,
    });

    await User.findByIdAndUpdate(user, { $push: { shortUrls: newUrl._id } });

    return NextResponse.json(
      { data: newUrl, message: "URL shortened successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
