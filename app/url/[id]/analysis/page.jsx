import { fetchUrlDataById } from "@/services/url.services";

export default async function Analysis({ params }) {
  const { id: urlId } = params;

  const data = await fetchUrlDataById(urlId);

  const { analytics } = data?.data;

  console.log(analytics);

  return (
    <div className="my-5">
      <h2>Analysis</h2>
      <div>
        <h2>Total Visit</h2>
        <p>{analytics?.length}</p>
      </div>
    </div>
  );
}
