import Link from "next/link";
import { TableCell, TableRow } from "./ui/table";
import CopyButton from "./CopyButton";
import { FlaskConical } from "lucide-react";
import DeleteButton from "./DeleteButton";
import { baseUrl } from "@/helper/constants";

export default function TableData({ url }) {
  // console.log(url);
  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          {url?.originalUrl.slice(0, 50)}
          {url?.originalUrl.length > 50 ? "..." : ""}
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2 justify-between">
            <Link href={`/url/${url?.shortUrl}`} target="_blank">
              {url?.shortUrl}
            </Link>
            <CopyButton url={`${baseUrl}/url/${url?.shortUrl}`} />
          </div>
        </TableCell>
        <TableCell className="text-right flex items-center justify-end gap-3">
          <Link href={`/url/${url?._id}/analysis`}>
            <div className="border p-2 rounded-full flex items-center gap-1">
              <p>{url?.analytics?.length}</p>
              <p className="text-gray-500">
                {url?.analytics?.length > 1 ? " visits" : " visit"}
              </p>
            </div>
            {/* <FlaskConical className="w-4 h-4" /> */}
          </Link>
          <DeleteButton id={url?._id} />
        </TableCell>
      </TableRow>
    </>
  );
}
