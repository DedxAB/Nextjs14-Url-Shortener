import { fetchUserByClerkId } from "@/services/user.services";
import { currentUser } from "@clerk/nextjs/server";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import TableData from "@/components/TableData";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
  const user = await currentUser();

  const userInfo = await fetchUserByClerkId(user?.id);

  const currentUserData = userInfo?.data ? userInfo.data : null;

  const shortUrls = currentUserData?.shortUrls || [];

  return (
    <>
      <div className="my-5">
        <h2>Dashboard</h2>
        <div>
          <h2 className="mt-5">
            Welcome, {currentUserData?.name || user?.fullName}{" "}
            <span className="text-gray-500">
              ({currentUserData?.email || user?.emailAddresses[0]?.emailAddress}
              )
            </span>
          </h2>
          <p className="text-gray-500">
            {shortUrls?.length > 0
              ? `You have created ${shortUrls?.length} short URLs.`
              : "You have not created any short URLs yet."}
          </p>
        </div>

        <div className="my-3 flex flex-col gap-1">
          <h2>
            Want to create a new short URL? Click the button below to get
            started.
          </h2>
          <Link href={`/short-url`}>
            <Button>Short Url</Button>
          </Link>
        </div>
        <div className="mt-5">
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
                return <TableData url={url} key={url?._id} />;
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
    </>
  );
}
