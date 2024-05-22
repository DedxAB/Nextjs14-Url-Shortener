import { fetchUrlDataById } from "@/services/url.services";
import dayjs from "dayjs";

export default async function Analysis({ params }) {
  const { id: urlId } = params;

  const data = await fetchUrlDataById(urlId);

  const { analytics } = data?.data;

  return (
    <div className="my-5">
      <h2>Analysis</h2>
      <div>
        <h2>Total Visit</h2>
        <p>{analytics?.length}</p>
        {analytics?.length > 0 &&
          analytics?.map((item, index) => {
            return (
              <div key={index}>
                <p>
                  <span>Time: </span>
                  {dayjs(item?.time).format("MMM DD, YYYY")}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
