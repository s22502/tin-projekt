import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Row from "@/components/Row";
import Refresh from "@/components/Refresh";

interface Props {
  params: { tagId: string };
}

const Page: React.FC<Props> = async ({ params }) => {
  const tagId = Number(params.tagId);
  if (isNaN(tagId)) {
    return notFound();
  }
  const tag = await prisma.tag.findFirst({
    where: { id: tagId },
    include: { NoteTags: { include: { Note: true } } },
  });

  if (!tag) {
    return notFound();
  }

  return (
    <div>
      <Refresh />
      <h1 className="mb-6 text-2xl">Tag - {tag.name}</h1>
      <div>
        <Row flex>
          <p className="font-bold">Id</p>
          <p>{tag.id}</p>
        </Row>
        <Row flex>
          <p className="font-bold">Name</p>
          <p>{tag.name}</p>
        </Row>
        <Row flex>
          <p className="font-bold">Created At</p>
          <p>{tag.createdAt.toString()}</p>
        </Row>
        <Row flex>
          <p className="font-bold">Color</p>
          <p>{tag.color}</p>
        </Row>
        <Row>
          <h2 className="mb-6 text-lg font-bold">NoteTags</h2>
          <div>
            {tag.NoteTags.map(({ Note }) => (
              <Row key={Note.id} level={2}>
                <Link href="/note/[noteId]" as={`/note/${Note.id}`}>
                  <h3 className="text-md mb-6 font-bold">Note - {Note.name}</h3>
                </Link>
                <Row level={3} flex>
                  <p className="font-bold">Id</p>
                  <p>{Note.id}</p>
                </Row>
                <Row level={3} flex>
                  <p className="font-bold">Name</p>
                  <p>{Note.name}</p>
                </Row>
                <Row level={3} flex>
                  <p className="font-bold">Created At</p>
                  <p>{Note.createdAt.toString()}</p>
                </Row>
                <Row level={3} flex>
                  <p className="font-bold">Updated At</p>
                  <p>{Note.updatedAt.toString()}</p>
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
