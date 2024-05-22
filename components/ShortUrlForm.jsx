"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { validateUrl } from "@/validations/url.validations";

export default function ShortUrlForm({ user }) {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Shortening your URL");

    if (!validateUrl(url)) {
      toast.error("Invalid URL", { id: toastId });
      return;
    }

    try {
      const res = await fetch("/api/short-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl: url, user: user?._id }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      toast.success("URL shortened successfully", { id: toastId });
      router.push("/dashboard");
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Input
        placeholder="Enter your URL"
        onChange={(e) => setUrl(e.target.value)}
        value={url}
      />
      <Button onClick={handleSubmit}>Short Url</Button>
    </div>
  );
}
