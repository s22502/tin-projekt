"use server";

import prisma from "@/lib/prisma";
import { type Tag } from ".prisma/client";

export const deleteTag = async (id: number) => {
  await prisma.tag.delete({ where: { id } });
};

export const addTag = async (tag: Omit<Tag, "id">) => {
  if (!tag.name) {
    return { status: false, message: "Missing name" };
  }

  if (!tag.color) {
    return { status: false, message: "Missing color" };
  }

  const response = await prisma.tag.create({ data: { ...tag } });

  return { status: true, data: response };
};

export const editTag = async (tag: Tag) => {
  if (!tag.name) {
    return { status: false, message: "Missing name" };
  }

  if (!tag.id) {
    return { status: false, message: "Missing id" };
  }

  if (!tag.color) {
    return { status: false, message: "Missing color" };
  }

  const response = await prisma.tag.update({
    where: { id: tag.id },
    data: { ...tag },
  });

  return { status: true, data: response };
};
