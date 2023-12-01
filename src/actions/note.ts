"use server";

import prisma from "@/lib/prisma";
import { type Note } from ".prisma/client";
import { type User } from "@prisma/client";

export const deleteNote = async (id: number) => {
  await prisma.note.delete({ where: { id } });
};

export const addNote = async (
  note: Omit<Note, "id">,
  tags: number[],
  user: User,
) => {
  if (!note.name) {
    return { status: false, message: "Missing name" };
  }

  if (!note.groupId) {
    return { status: false, message: "Missing groupId" };
  }

  if (!user.id) {
    return { status: false, message: "Missing User id" };
  }

  const newNote = await prisma.note.create({
    data: {
      name: note.name,
      Group: { connect: { id: note.groupId } },
      User: { connect: { id: user.id } },
    },
  });

  await handleTags(tags, newNote.id);

  return { status: true, data: newNote };
};

export const editNote = async (note: Note, tags: number[]) => {
  if (!note.name) {
    return { status: false, message: "Missing name" };
  }

  if (!note.id) {
    return { status: false, message: "Missing id" };
  }

  if (!note.groupId) {
    return { status: false, message: "Missing color" };
  }

  const updatedNote = await prisma.note.update({
    where: { id: note.id },
    data: {
      name: note.name,
      groupId: note.groupId,
    },
  });

  await handleTags(tags, updatedNote.id);

  return { status: true, data: updatedNote };
};

const handleTags = async (tags: number[], noteId: number) => {
  await prisma.noteTags.deleteMany({
    where: {
      noteId,
      tagId: { notIn: tags },
    },
  });

  const alreadyAssignedTags = await prisma.noteTags.findMany({
    where: {
      noteId,
    },
  });

  if (tags && tags.length > 0) {
    for (const tagId of tags) {
      if (alreadyAssignedTags.find((t) => t.tagId === tagId)) {
        continue;
      }

      await prisma.noteTags.create({
        data: {
          tagId,
          noteId,
        },
      });
    }
  }
};
