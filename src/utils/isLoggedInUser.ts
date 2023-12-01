"use server";
import { cookies } from "next/headers";

export const isLoggedInUser = () => cookies().has("user");
