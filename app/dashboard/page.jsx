import { fetchUserByClerkId } from "@/services/user.services";
import { currentUser } from "@clerk/nextjs/server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteButton from "@/components/DeleteButton";
import React from "react";
import Link from "next/link";
import { baseUrl } from "@/helper/constants";
import { FlaskConical } from "lucide-react";
import CopyButton from "@/components/CopyButton";

export default async function Dashboard() {
  const user = await currentUser();

  const userInfo = await fetchUserByClerkId(user?.id);

  const currentUserData = userInfo?.data ? userInfo.data : null;

  const shortUrls = currentUserData?.shortUrls || [];

  return (
    <div className="my-5">
      <h2 className="">Dashboard</h2>
      <div className="mt-5">
        {/* <h3>Short URLs</h3> */}

        <Table>
          <TableCaption>
            A table showing the short URLs created by you
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className={`w-[30rem]`}>Original URL</TableHead>
              <TableHead>Short URL</TableHead>
              <TableHead className="text-right">Analysis</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shortUrls.map((url) => {
              return (
                <React.Fragment key={url?._id}>
                  <TableRow>
                    <TableCell className="font-medium">
                      {url?.originalUrl.slice(0, 50)}
                      {url?.originalUrl.length > 50 ? "..." : ""}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link href={`/url/${url?.shortUrl}`}>
                          {url?.shortUrl}
                        </Link>
                        <CopyButton url={`${baseUrl}/url/${url?.shortUrl}`} />
                      </div>
                    </TableCell>
                    <TableCell className="text-right flex items-center justify-end gap-3">
                      <Link href={`/url/${url?._id}/analysis`}>
                        <FlaskConical className="w-4 h-4" />
                      </Link>
                      <DeleteButton id={url?._id} />
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
        {!shortUrls.length && (
          <div className="mt-5 text-center">
            <p className="text-gray-500">
              You have not created any short URLs yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
