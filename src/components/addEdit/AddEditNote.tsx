"use client";

import React from "react";
import { type Group, type Note, type NoteTags, type Tag } from ".prisma/client";
import { Controller, useForm } from "react-hook-form";
import Error from "@/components/Error";
import Submit from "@/components/buttons/Submit";
import { useRouter } from "next/navigation";
import { addNote, editNote } from "@/actions/note";
import { useUser } from "@/components/UserProvider";
import Select from "react-select";

interface Props {
  groups: Group[];
  tags: Tag[];
  isEdit?: boolean;
  note: Note | null;
  noteTags: NoteTags[];
}

type FormData = Note & { tags: number[] };

const AddEditNote: React.FC<Props> = ({
  isEdit,
  note,
  tags,
  groups,
  noteTags,
}) => {
  const router = useRouter();

  const { user } = useUser();

  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      ...(note ?? undefined),
      tags: [...noteTags.map((nt) => nt.tagId)],
    },
  });

  const onSubmit = async (data: FormData) => {
    clearErrors();

    if (isEdit) {
      await editNote(
        data,
        data.tags.map((tag) => Number(tag)),
      ).then((response) => {
        if (response.status) {
          router.refresh();
          router.push(`/note/${response.data?.id}`);
          return;
        }
        setError("root", { message: response.message });
      });
    } else {
      await addNote(
        data,
        data.tags.map((tag) => Number(tag)),
        user!,
      ).then((response) => {
        if (response.status) {
          router.refresh();
          router.push(`/note/${response.data?.id}`);
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
          <label htmlFor="groupId" className="block">
            Group
          </label>
          <select
            {...register("groupId", {
              valueAsNumber: true,
            })}
            id="groupId"
          >
            {groups.map((g) => (
              <option value={g.id} key={g.id}>
                {g.name}
              </option>
            ))}
          </select>
          {errors.groupId?.message && <Error text={errors.groupId.message} />}
        </div>
        <div className="mt-4">
          <label htmlFor="tags" className="block">
            Tags
          </label>
          <Controller
            control={control}
            name="tags"
            render={({ field: { onChange, onBlur, value, name, ref } }) => {
              const val = value.map((val) => ({
                label: tags.find((t) => t.id === val)?.name ?? "",
                value: val,
              }));

              return (
                <Select
                  options={tags.map((t) => ({
                    label: t.name,
                    value: t.id,
                  }))}
                  onChange={(newValue) =>
                    onChange(newValue.map((v) => v.value))
                  }
                  isMulti={true}
                  onBlur={onBlur}
                  value={val}
                  name={name}
                  ref={ref}
                  defaultValue={val}
                  hideSelectedOptions
                  className="text-black"
                />
              );
            }}
          />
          {errors.tags?.message && <Error text={errors.tags.message} />}
        </div>
        <Submit text={isEdit ? "Save" : "Add"} />
      </form>
      {errors.root?.message && <Error text={errors.root.message} />}
    </div>
  );
};

export default AddEditNote;
