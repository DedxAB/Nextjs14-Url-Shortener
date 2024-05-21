import ShortUrlForm from "@/components/ShortUrlForm";
import { fetchUserByClerkId } from "@/services/user.services";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ShortUrl() {
  const user = await currentUser();

  const data = await fetchUserByClerkId(user?.id);
  const currentUserData = data?.data ? data.data : null;
  if (!currentUserData?.onboarded) {
    redirect(`/onboarding`);
  }
  return (
    <div className="my-5">
      <h1 className="my-3">Paste your url here</h1>
      <ShortUrlForm user={currentUserData} />
    </div>
  );
}
