import { baseUrl } from "@/helper/constants";

export const fetchUserByClerkId = async (clerkId) => {
  try {
    const res = await fetch(`${baseUrl}/api/user/${clerkId}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error);
    }
    return await res.json();
  } catch (error) {
    console.log(`Error in fetchUserByClerkId: ${error}`);
  }
};
