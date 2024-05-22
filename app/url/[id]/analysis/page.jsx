import { fetchUrlDataById } from "@/services/url.services";
import dayjs from "dayjs";

export default async function Analysis({ params }) {
  const { id: urlId } = params;

  const data = await fetchUrlDataById(urlId);

  const { analytics } = data?.data;

  return (
    <div className="my-5">
      <div>
        <div className="w-32 min-h-fit border py-2 px-3 rounded-lg my-3">
          <h2>Total Visits</h2>
          <p className="text-primary">{analytics?.length}</p>
        </div>

        {analytics?.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {analytics?.length > 0 &&
              analytics?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-fit min-h-fit border rounded-lg py-2 px-3 my-1"
                  >
                    <p>
                      <span className="text-primary">Time</span>
                    </p>
                    <p>
                      {dayjs(item?.time.toLocaleString()).format(
                        "MMM DD, YYYY hh:mm A"
                      )}
                    </p>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
