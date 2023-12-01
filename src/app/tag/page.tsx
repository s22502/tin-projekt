import prisma from "@/lib/prisma";
import Link from "next/link";
import Row from "@/components/Row";
import Pagination from "@/components/Pagination";
import Delete from "@/components/buttons/Delete";
import Edit from "@/components/buttons/Edit";
import { deleteTag } from "@/actions/tag";
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

export default async function Tags({ searchParams }: Props) {
  const page = isNaN(Number(searchParams.page))
    ? 1
    : Number(searchParams.page ?? 1);

  const allTagsCount = await prisma.tag.count();

  const tags = await prisma.tag.findMany({
    skip: PER_PAGE * (page - 1),
    take: PER_PAGE,
  });

  const isLoggedIn = isLoggedInUser();

  return (
    <div>
      <Refresh />
      <div className="flex items-center justify-between">
        <h1 className="mb-6 text-2xl">Tags list</h1>
        {isLoggedIn && (
          <Link href="/tag/upsert/[[...tagId]]" as={`/tag/upsert/`}>
            <Add />
          </Link>
        )}
      </div>
      {tags.map((t) => (
        <Row flex key={t.id}>
          <Link href={"/tag/[tagId]"} as={`/tag/${t.id}`}>
            {t.name}
          </Link>
          {isLoggedIn && (
            <div className="flex gap-3">
              <Delete onClick={deleteTag} id={t.id} />
              <Link href="/tag/upsert/[[...tagId]]" as={`/tag/upsert/${t.id}`}>
                <Edit />
              </Link>
            </div>
          )}
        </Row>
      ))}
      <Pagination totalItems={allTagsCount} itemsPerPage={PER_PAGE} />
    </div>
  );
}
