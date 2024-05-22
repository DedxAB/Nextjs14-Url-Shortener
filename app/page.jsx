import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
      <p className="text-gray-600 mb-8">
        Shorten your URLs by signing in or creating an account.
      </p>
      <div className="flex space-x-4">
        <Link href="/sign-in">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Sign In
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
}
