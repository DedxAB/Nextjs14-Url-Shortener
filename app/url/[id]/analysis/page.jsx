import { fetchUrlDataById } from "@/services/url.services";

export default async function Analysis({ params }) {
  const { id: urlId } = params;

  const data = await fetchUrlDataById(urlId);
  console.log(data);

  return <div className="my-5">Analysis</div>;
}
