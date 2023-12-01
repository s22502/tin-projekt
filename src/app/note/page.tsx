import prisma from "@/lib/prisma";
import Link from "next/link";
import Row from "@/components/Row";
import Pagination from "@/components/Pagination";
import Delete from "@/components/buttons/Delete";
import Edit from "@/components/buttons/Edit";
import { deleteNote } from "@/actions/note";
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

export default async function Notes({ searchParams }: Props) {
  const page = isNaN(Number(searchParams.page))
    ? 1
    : Number(searchParams.page ?? 1);

  const allNotesCount = await prisma.note.count();

  const notes = await prisma.note.findMany({
    skip: PER_PAGE * (page - 1),
    take: PER_PAGE,
  });

  const isLoggedIn = isLoggedInUser();

  return (
    <div>
      <Refresh />
      <div className="flex items-center justify-between">
        <h1 className="mb-6 text-2xl">Notes list</h1>
        {isLoggedIn && (
          <Link href="/note/upsert/[[...noteId]]" as={`/note/upsert/`}>
            <Add />
          </Link>
        )}
      </div>
      {notes.map((n) => (
        <Row flex key={n.id}>
          <Link href={"/note/[noteId]"} as={`/note/${n.id}`}>
            {n.name}
          </Link>
          {isLoggedIn && (
            <div className="flex gap-3">
              <Delete onClick={deleteNote} id={n.id} />
              <Link
                href="/note/upsert/[[...noteId]]"
                as={`/note/upsert/${n.id}`}
              >
                <Edit />
              </Link>
            </div>
          )}
        </Row>
      ))}
      <Pagination totalItems={allNotesCount} itemsPerPage={PER_PAGE} />
    </div>
  );
}
