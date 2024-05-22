import Link from "next/link";
import { Button } from "./ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ToggleTheme } from "./ToggleTheme";
import AccountProfile from "./AccountProfile";
import { currentUser } from "@clerk/nextjs/server";

export default async function Navbar() {
  const user = await currentUser();
  const imageUrl = user?.imageUrl;
  const name = user?.fullName;

  return (
    <nav className="max-w-3xl relative mx-auto px-4 flex justify-between items-center py-4">
      <Link href="/">
        <h1 className={`font-semibold text-lg md:text-xl`}>
          Dedx
          <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Url
          </span>
        </h1>
      </Link>
      <SignedIn>
        <div className="flex items-center gap-2">
          <ToggleTheme />
          {/* <Link href={`/short-url`} className="hidden sm:block">
            <Button>Short Url</Button>
          </Link> */}
          <Link href={`/dashboard`}>
            <Button>Dashboard</Button>
          </Link>
          <AccountProfile image={imageUrl} name={name} />
        </div>
      </SignedIn>
      <SignedOut>
        <div className="flex items-center justify-between gap-3">
          <ToggleTheme />
          <Link href={`/sign-in`}>
            <Button>Sign In</Button>
          </Link>
        </div>
      </SignedOut>
    </nav>
  );
}
