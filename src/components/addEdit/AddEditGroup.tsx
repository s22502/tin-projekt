"use client";

import React from "react";
import { type Group } from ".prisma/client";
import { useForm } from "react-hook-form";
import Error from "@/components/Error";
import Submit from "@/components/buttons/Submit";
import { addGroup, editGroup } from "@/actions/group";
import { useRouter } from "next/navigation";

interface Props {
  isEdit?: boolean;
  group: Group | null;
}

const AddEditGroup: React.FC<Props> = ({ isEdit, group }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<Group>({ defaultValues: group ?? undefined });

  const onSubmit = async (data: Group) => {
    clearErrors();

    if (isEdit) {
      await editGroup(data).then((response) => {
        if (response.status) {
          router.push(`/group/${response.data?.id}`);
          return;
        }

        setError("root", { message: response.message });
      });
    } else {
      await addGroup(data).then((response) => {
        if (response.status) {
          router.push(`/group/${response.data?.id}`);
          return;
        }

        setError("root", { message: response.message });
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("name", { required: "Field required" })}
            placeholder="name"
          />
          {errors.name?.message && <Error text={errors.name.message} />}
        </div>

        <Submit text={isEdit ? "Save" : "Add"} />
      </form>
      {errors.root?.message && <Error text={errors.root.message} />}
    </div>
  );
};

export default AddEditGroup;
