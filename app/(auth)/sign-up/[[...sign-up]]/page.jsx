import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center mt-14">
      <SignUp path="/sign-up" />
    </div>
  );
}
