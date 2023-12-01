"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  onClick: (id: number) => Promise<void>;
  id: number;
}

const Delete: React.FC<Props> = ({ onClick, id: id }) => {
  const router = useRouter();

  return (
    <button
      className="font-bold text-red-500 hover:cursor-pointer"
      onClick={async (e) => {
        e.stopPropagation();
        await onClick(id);
        router.refresh();
      }}
    >
      Delete
    </button>
  );
};

export default Delete;
