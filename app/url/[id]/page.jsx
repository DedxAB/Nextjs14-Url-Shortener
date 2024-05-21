import { fetchUrlById } from "@/services/url.services";
import { redirect } from "next/navigation";

export default async function page({ params }) {
  const { id } = params;
  const data = await fetchUrlById(id);
  const actualData = data?.data ? data.data : null;
  console.log(actualData); 

//   if (actualData) {
//     redirect(actualData?.originalUrl);
//   }

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
}
