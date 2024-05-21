import AccountProfileForm from "@/components/AccountProfileForm";
import { fetchUserByClerkId } from "@/services/user.services";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Onboarding() {
  const user = await currentUser();

  const data = await fetchUserByClerkId(user?.id);
  const currentUserData = data?.data ? data.data : null;

  if (currentUserData?.onboarded) {
    redirect("/");
  }

  // this data comes from mongoDB
  const userInfo = {
    name: currentUserData?.name,
    email: currentUserData?.email,
  };

  // here we are creating a new object with the data from mongoDB and Clerk
  const userData = {
    clerkId: user?.id,
    name: userInfo?.name || user?.fullName,
    email: userInfo?.email || user?.emailAddresses[0].emailAddress,
  };

  return (
    <>
      <h2>Onboarding</h2>
      <p>Complete your profile to get started with the app.</p>
      <div>
        <AccountProfileForm userData={userData} />
      </div>
    </>
  );
}
