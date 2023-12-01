"use client";

import React from "react";
import { useUser } from "@/components/UserProvider";
import Link from "next/link";
import { logOut as logOutAction } from "@/actions/auth";

const NavUser = () => {
  const { user, setUser } = useUser();

  const logOut = () => {
    setUser(null);
    logOutAction();
  };

  if (!user) {
    return (
      <>
        <Link href="/log-in" className="ml-auto underline">
          Log in
        </Link>
        <Link href="/sign-up" className="underline">
          Sign up
        </Link>
      </>
    );
  }

  return (
    <>
      <p className="ml-auto">
        Logged in as <span className="text-yellow-700">{user.username}</span>
      </p>
      <button className="underline" onClick={logOut}>
        Log Out
      </button>
    </>
  );
};

export default NavUser;
