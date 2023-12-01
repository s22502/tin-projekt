import prisma from "@/lib/prisma";
import Link from "next/link";
import Row from "@/components/Row";
import Pagination from "@/components/Pagination";
import Delete from "@/components/buttons/Delete";
import { deleteGroup } from "@/actions/group";
import Edit from "@/components/buttons/Edit";
import Add from "@/components/buttons/Add";
import { isLoggedInUser } from "@/utils/isLoggedInUser";
import Refresh from "@/components/Refresh";
import React from "react";

interface Props {
  searchParams: {
    page?: string;
  };
}

const PER_PAGE = 3;

export default async function Groups({ searchParams }: Props) {
  const page = isNaN(Number(searchParams.page))
    ? 1
    : Number(searchParams.page ?? 1);

  const allGroupsCount = await prisma.group.count();

  const groups = await prisma.group.findMany({
    skip: PER_PAGE * (page - 1),
    take: PER_PAGE,
  });

  const isLoggedIn = isLoggedInUser();

  return (
    <div>
      <Refresh />
      <div className="flex items-center justify-between">
        <h1 className="mb-6 text-2xl">Groups list</h1>
        {isLoggedIn && (
          <Link href="/group/upsert/[[...groupId]]" as={`/group/upsert/`}>
            <Add />
          </Link>
        )}
      </div>
      {groups.map((g) => (
        <Row flex key={g.id}>
          <Link href={"/group/[groupId]"} as={`/group/${g.id}`}>
            {g.name}
          </Link>
          {isLoggedIn && (
            <div className="flex gap-3">
              <Delete onClick={deleteGroup} id={g.id} />
              <Link
                href="/group/upsert/[[...groupId]]"
                as={`/group/upsert/${g.id}`}
              >
                <Edit />
              </Link>
            </div>
          )}
        </Row>
      ))}
      <Pagination totalItems={allGroupsCount} itemsPerPage={PER_PAGE} />
    </div>
  );
}
