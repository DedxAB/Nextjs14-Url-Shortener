import Link from "next/link";
import { Button } from "./ui/button";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ToggleTheme } from "./ToggleTheme";

export default function Navbar() {
  return (
    <nav className="max-w-3xl relative mx-auto px-4 flex justify-between items-center py-4">
      <Link href={`/`}>DedxUrl</Link>
      <SignedIn>
        <div className="flex items-center gap-2">
          <ToggleTheme />
          <Link href={`/short-url`}>
            <Button>Short Url</Button>
          </Link>
          <Link href={`/dashboard`}>
            <Button>Dashboard</Button>
          </Link>
          <SignOutButton>Sign Out</SignOutButton>
        </div>
      </SignedIn>
      <SignedOut>
        <Link href={`/sign-in`}>
          <Button>Sign In</Button>
        </Link>
      </SignedOut>
    </nav>
  );
}
