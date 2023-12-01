import React from "react";

interface Props {
  text: string;
}

const Error: React.FC<Props> = ({ text }) => {
  return <p className="mt-2 font-bold text-red-600">{text}</p>;
};

export default Error;
