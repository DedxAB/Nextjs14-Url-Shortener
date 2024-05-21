import { fetchUrlById } from "@/services/url.services";
import { redirect } from "next/navigation";

export default async function page({ params }) {
  const { id } = params;
  const data = await fetchUrlById(id);
  const actualData = data?.data ? data.data : null;

  if (actualData) {
    redirect(actualData?.originalUrl);
  }

  return (
    <div className="my-5">
      <h1>Sorry the url is not found!</h1>
    </div>
  );
}
