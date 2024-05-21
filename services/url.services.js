import { baseUrl } from "@/helper/constants";

export const fetchUrlById = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/short-url/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error);
    }
    return await res.json();
  } catch (error) {
    console.log(`Error fetching URL by ID: ${error}`);
  }
};

export const fetchUrlDataById = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/api/short-url/${id}/analysis`, {
      cache: "no-store",
    });
    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error);
    }
    return await res.json();
  } catch (error) {
    console.log(`Error fetching URL data by ID: ${error}`);
  }
};
