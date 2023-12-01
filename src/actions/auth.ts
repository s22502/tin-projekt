"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export const logIn = async (data: { username: string; password: string }) => {
  const user = await prisma.user.findFirst({
    where: {
      username: data.username,
      password: data.password,
    },
  });

  if (!user) {
    return null;
  }

  cookies().set("user", JSON.stringify(user));

  return user;
};

export const signUp = async (data: { username: string; password: string }) => {
  const userAlreadyExists = await prisma.user.findFirst({
    where: {
      username: data.username,
    },
  });

  if (userAlreadyExists) {
    return null;
  }

  const user = await prisma.user.create({
    data: {
      username: data.username,
      password: data.password,
    },
  });

  if (!user) {
    return null;
  }

  cookies().set("user", JSON.stringify(user));

  return user;
};

export const logOut = () => {
  cookies().delete("user");
};
