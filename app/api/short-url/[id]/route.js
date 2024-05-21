import dbConnect from "@/db/mongodb";
import Url from "@/models/url.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const GET = async (_req, { params }) => {
  const { id } = params;
  try {
    await dbConnect();
    const url = await Url.findOneAndUpdate(
      { shortUrl: id },
      {
        $push: { analytics: { time: new Date() } },
      }
    );
    if (!url) {
      return NextResponse.json({ error: "URL not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "URL found", data: url },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const DELETE = async (_req, { params }) => {
  const { id } = params;
  try {
    await dbConnect();
    const deletedUrl = await Url.findByIdAndDelete(id);
    if (!deletedUrl) {
      return NextResponse.json({ error: "URL not found" }, { status: 404 });
    }
    await User.findByIdAndUpdate(deletedUrl.user, {
      $pull: { shortUrls: deletedUrl._id },
    });
    return NextResponse.json(
      { message: "URL deleted successfully", data: deletedUrl },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
