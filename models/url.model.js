import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    originalUrl: { 
      type: String,
      required: [true, "Original URL is required"],
    },
    shortUrl: {
      type: String,
      required: [true, "Short URL is required"],
      unique: [true, "Short URL already exists"],
    },
    analytics: [
      {
        time: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

const Url = mongoose.models.Url || mongoose.model("Url", urlSchema);
export default Url;
