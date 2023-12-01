import React from "react";

interface Props {
  text: string;
}

const Submit: React.FC<Props> = ({ text }) => {
  return (
    <div className="mt-4">
      <button type="submit" className="rounded bg-yellow-700 p-2 font-bold">
        {text}
      </button>
    </div>
  );
};

export default Submit;
