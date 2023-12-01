import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Row from "@/components/Row";
import Refresh from "@/components/Refresh";

interface Props {
  params: { groupId: string };
}

const Page: React.FC<Props> = async ({ params }) => {
  const groupId = Number(params.groupId);

  if (isNaN(groupId)) {
    return notFound();
  }
  const group = await prisma.group.findFirst({
    where: { id: groupId },
    include: { Notes: true },
  });

  if (!group) {
    return notFound();
  }

  return (
    <div>
      <Refresh />
      <h1 className="mb-6 text-2xl">Group - {group.name}</h1>
      <div>
        <Row flex>
          <p className="font-bold">Id</p>
          <p>{group.id}</p>
        </Row>
        <Row flex>
          <p className="font-bold">Name</p>
          <p>{group.name}</p>
        </Row>
        <Row flex>
          <p className="font-bold">Created At</p>
          <p>{group.createdAt.toString()}</p>
        </Row>
        <Row flex>
          <p className="font-bold">Updated At</p>
          <p>{group.updatedAt.toString()}</p>
        </Row>
        <Row>
          <h2 className="mb-6 text-lg font-bold">NoteTags</h2>
          <div>
            {group.Notes.map((note) => (
              <Row key={note.id} level={2}>
                <Link href="/note/[noteId]" as={`/note/${note.id}`}>
                  <h3 className="text-md mb-6 font-bold">Note - {note.name}</h3>
                </Link>
                <Row level={3} flex>
                  <p className="font-bold">Id</p>
                  <p>{note.id}</p>
                </Row>
                <Row level={3} flex>
                  <p className="font-bold">Name</p>
                  <p>{note.name}</p>
                </Row>
                <Row level={3} flex>
                  <p className="font-bold">Created At</p>
                  <p>{note.createdAt.toString()}</p>
                </Row>
                <Row level={3} flex>
                  <p className="font-bold">Updated At</p>
                  <p>{note.updatedAt.toString()}</p>
                </Row>
              </Row>
            ))}
          </div>
        </Row>
      </div>
    </div>
  );
};

export default Page;
