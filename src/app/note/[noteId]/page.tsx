import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Row from "@/components/Row";

interface Props {
  params: { noteId: string };
}

const Page: React.FC<Props> = async ({ params }) => {
  const noteId = Number(params.noteId);

  if (isNaN(noteId)) {
    return notFound();
  }
  const note = await prisma.note.findFirst({
    where: { id: noteId },
    include: { Group: true, User: true, NoteTags: { include: { Tag: true } } },
  });

  if (!note) {
    return notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl">Note - {note.name}</h1>
      <div>
        <Row flex>
          <p className="font-bold">Id</p>
          <p>{note.id}</p>
        </Row>
        <Row flex>
          <p className="font-bold">Name</p>
          <p>{note.name}</p>
        </Row>
        <Row flex>
          <p className="font-bold">Created At</p>
          <p>{note.createdAt.toString()}</p>
        </Row>
        <Row flex>
          <p className="font-bold">Updated At</p>
          <p>{note.updatedAt.toString()}</p>
        </Row>
        <Row>
          <h2 className="mb-6 text-lg font-bold">
            User - {note.User.username}
          </h2>
          <div>
            <Row flex level={3}>
              <p className="font-bold">Id</p>
              <p>{note.User.id}</p>
            </Row>
            <Row flex level={3}>
              <p className="font-bold">Username</p>
              <p>{note.User.username}</p>
            </Row>
          </div>
        </Row>
        <Row>
          <Link href="/group/[groupId]" as={`/group/${note.Group.id}`}>
            <h2 className="mb-6 text-lg font-bold">
              Group - {note.Group.name}
            </h2>
          </Link>
          <div>
            <Row flex level={3}>
              <p className="font-bold">Id</p>
              <p>{note.Group.id}</p>
            </Row>
            <Row flex level={3}>
              <p className="font-bold">Name</p>
              <p>{note.Group.name}</p>
            </Row>
            <Row flex level={3}>
              <p className="font-bold">Created At</p>
              <p>{note.Group.createdAt.toString()}</p>
            </Row>
            <Row flex level={3}>
              <p className="font-bold">Updated at</p>
              <p>{note.Group.updatedAt.toString()}</p>
            </Row>
          </div>
        </Row>
        <Row>
          <h2 className="mb-6 text-lg font-bold">NoteTags</h2>
          <div>
            {note.NoteTags.map(({ Tag }) => (
              <Row key={Tag.id} level={2}>
                <Link href="/tag/[tagId]" as={`/tag/${Tag.id}`}>
                  <h3 className="text-md mb-6 font-bold">Tag - {Tag.name}</h3>
                </Link>
                <Row level={3} flex>
                  <p className="font-bold">Id</p>
                  <p>{Tag.id}</p>
                </Row>
                <Row level={3} flex>
                  <p className="font-bold">Name</p>
                  <p>{Tag.name}</p>
                </Row>
                <Row level={3} flex>
                  <p className="font-bold">Created At</p>
                  <p>{Tag.createdAt.toString()}</p>
                </Row>
                <Row level={3} flex>
                  <p className="font-bold">Color</p>
                  <p>{Tag.color}</p>
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
