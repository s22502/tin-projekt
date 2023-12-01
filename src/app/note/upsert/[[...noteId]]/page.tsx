import React from "react";
import { type Note } from ".prisma/client";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import AddEditNote from "@/components/addEdit/AddEditNote";
import { isLoggedInUser } from "@/utils/isLoggedInUser";
import Refresh from "@/components/Refresh";

interface Props {
  params: { noteId?: string[] };
}

const Page: React.FC<Props> = async ({ params }) => {
  if (!isLoggedInUser()) {
    redirect("/note");
  }

  const noteId = params.noteId?.[0];

  let isEdit = false;
  let note: Note | null = null;
  if (noteId) {
    isEdit = true;

    const numericalNoteId = Number(noteId);

    if (isNaN(numericalNoteId)) {
      return notFound();
    }

    note = await prisma.note.findFirst({ where: { id: numericalNoteId } });

    if (!note) {
      return notFound();
    }
  }

  const tags = await prisma.tag.findMany();
  const groups = await prisma.group.findMany();
  const noteTags = await prisma.noteTags.findMany({
    where: { noteId: note?.id },
  });

  return (
    <div>
      <Refresh />
      <h1 className="mb-6 text-2xl">{isEdit ? "Edit" : "Add"} note</h1>
      <AddEditNote
        note={note}
        isEdit={isEdit}
        groups={groups}
        tags={tags}
        noteTags={noteTags}
      />
    </div>
  );
};

export default Page;
