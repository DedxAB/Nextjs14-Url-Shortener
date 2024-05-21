"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export default function AccountProfileForm({ userData }) {
  const { name, email, clerkId } = userData;
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Updating profile...");
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, email, clerkId }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }

      toast.success("Profile updated successfully", { id: toastId });
      router.push("/short-url");
    } catch (error) {
      toast.error(error, { id: toastId });
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
        <Input
          label="Name"
          placeholder="Enter your name"
          value={name}
          disabled={true}
        />
        <Input
          label="Name"
          placeholder="Enter your name"
          value={email}
          disabled={true}
        />
      </div>
      <div className="flex items-center justify-end">
        <Button onClick={handleSubmit}>Update</Button>
      </div>
    </div>
  );
}
