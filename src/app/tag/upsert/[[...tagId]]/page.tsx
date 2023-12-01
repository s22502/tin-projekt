import React from "react";
import { type Tag } from ".prisma/client";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import AddEditTag from "@/components/addEdit/AddEditTag";
import { isLoggedInUser } from "@/utils/isLoggedInUser";
import Refresh from "@/components/Refresh";

interface Props {
  params: { tagId?: string[] };
}

const Page: React.FC<Props> = async ({ params }) => {
  if (!isLoggedInUser()) {
    redirect("/tag");
  }

  const tagId = params.tagId?.[0];

  let isEdit = false;
  let tag: Tag | null = null;
  if (tagId) {
    isEdit = true;

    const numericalTagId = Number(tagId);

    if (isNaN(numericalTagId)) {
      return notFound();
    }

    tag = await prisma.tag.findFirst({ where: { id: numericalTagId } });

    if (!tag) {
      return notFound();
    }
  }

  return (
    <div>
      <Refresh />
      <h1 className="mb-6 text-2xl">{isEdit ? "Edit" : "Add"} tag</h1>
      <AddEditTag tag={tag} isEdit={isEdit} />
    </div>
  );
};

export default Page;
