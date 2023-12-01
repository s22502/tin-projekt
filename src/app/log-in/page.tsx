"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Error from "@/components/Error";
import { logIn } from "@/actions/auth";
import { useUser } from "@/components/UserProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Submit from "@/components/buttons/Submit";

interface FormData {
  username: string;
  password: string;
}

const Page = () => {
  const { user, setUser } = useUser();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    clearErrors();

    await logIn(data).then((response) => {
      if (!response) {
        setError("root", { message: "Invalid data" });
        return;
      }
      setUser(response);
      router.push("/");
    });
  };

  if (user) {
    return (
      <div>
        <h1 className="mb-6 text-2xl">User already logged in</h1>
        <Link href="/">Go to homepage</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl">Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4">
          <input
            {...register("username", { required: "Field required" })}
            placeholder="username"
          />
          {errors.username?.message && <Error text={errors.username.message} />}
        </div>
        <div className="mt-4">
          <input
            {...register("password", { required: "Field required" })}
            placeholder="password"
            type="password"
          />
          {errors.password?.message && <Error text={errors.password.message} />}
        </div>
        <Submit text="Log in" />
        {errors.root?.message && <Error text={errors.root.message} />}
      </form>
    </div>
  );
};

export default Page;
