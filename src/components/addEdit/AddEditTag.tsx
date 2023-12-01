"use client";

import React from "react";
import { type Tag } from ".prisma/client";
import { useForm } from "react-hook-form";
import Error from "@/components/Error";
import Submit from "@/components/buttons/Submit";
import { useRouter } from "next/navigation";
import { addTag, editTag } from "@/actions/tag";

interface Props {
  isEdit?: boolean;
  tag: Tag | null;
}

const AddEditTag: React.FC<Props> = ({ isEdit, tag }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Tag>({ defaultValues: tag ?? undefined });

  const onSubmit = async (data: Tag) => {
    clearErrors();

    if (isEdit) {
      await editTag(data).then((response) => {
        if (response.status) {
          router.push(`/tag/${response.data?.id}`);
          return;
        }
        setError("root", { message: response.message });
      });
    } else {
      await addTag(data).then((response) => {
        if (response.status) {
          router.push(`/tag/${response.data?.id}`);
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
        <div className="mt-4">
          <label htmlFor="color" className="block">
            Tag color
          </label>
          <input
            {...register("color", { required: "Field required" })}
            placeholder="name"
            type="color"
            id="color"
          />
          {errors.name?.message && <Error text={errors.name.message} />}
        </div>

        <Submit text={isEdit ? "Save" : "Add"} />
      </form>
      {errors.root?.message && <Error text={errors.root.message} />}
    </div>
  );
};

export default AddEditTag;
