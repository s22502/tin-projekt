"use server";

import prisma from "@/lib/prisma";
import { type Group } from ".prisma/client";

export const deleteGroup = async (id: number) => {
  await prisma.group.delete({ where: { id } });
};

export type AddGroupDto = Omit<Group, "id" | "createdAt" | "updatedAt">;

export const addGroup = async (group: AddGroupDto) => {
  if (!group.name) {
    return { status: false, message: "Missing name" };
  }

  const response = await prisma.group.create({ data: { ...group } });

  return { status: true, data: response };
};

export type EditGroupDto = Omit<Group, "createdAt" | "updatedAt">;
export const editGroup = async (group: EditGroupDto) => {
  if (!group.name) {
    return { status: false, message: "Missing name" };
  }

  if (!group.id) {
    return { status: false, message: "Missing id" };
  }

  const response = await prisma.group.update({
    where: { id: group.id },
    data: { ...group },
  });

  return { status: true, data: response };
};
