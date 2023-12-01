import React from "react";
import { type Group } from ".prisma/client";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import AddEditGroup from "@/components/addEdit/AddEditGroup";
import { isLoggedInUser } from "@/utils/isLoggedInUser";
import Refresh from "@/components/Refresh";

interface Props {
  params: { groupId?: string[] };
}

const Page: React.FC<Props> = async ({ params }) => {
  if (!isLoggedInUser()) {
    redirect("/group");
  }

  const groupId = params.groupId?.[0];

  let isEdit = false;
  let group: Group | null = null;
  if (groupId) {
    isEdit = true;

    const numericalGroupId = Number(groupId);

    if (isNaN(numericalGroupId)) {
      return notFound();
    }

    group = await prisma.group.findFirst({ where: { id: numericalGroupId } });

    if (!group) {
      return notFound();
    }
  }

  return (
    <div>
      <Refresh />
      <h1 className="mb-6 text-2xl">{isEdit ? "Edit" : "Add"} group</h1>
      <AddEditGroup group={group} isEdit={isEdit} />
    </div>
  );
};

export default Page;
