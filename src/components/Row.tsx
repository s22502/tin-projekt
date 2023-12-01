import React, { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  level?: 1 | 2 | 3;
  flex?: boolean;
}

const Row: React.FC<Props> = ({ children, level = 1, flex = false }) => {
  const bgColor = {
    1: "bg-amber-950",
    2: "bg-amber-800",
    3: "bg-amber-700",
  };

  return (
    <div
      className={`${bgColor[level]} mb-2 ${
        flex ? "flex items-center justify-between" : ""
      } rounded-lg p-2`}
    >
      {children}
    </div>
  );
};

export default Row;
