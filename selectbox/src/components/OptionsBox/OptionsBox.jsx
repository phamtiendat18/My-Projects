import { useState } from "react";

const OptionsBox = ({ value, onValues }) => {
  const { id, content, selected } = value;
  const handleClickOption = (e) => {
    onValues({ id, content, selected: !selected });
  };
  return (
    <div
      className={`max-h-[30px] px-[10px] py-[5px] rounded-[10px] hover:bg-slate-200 flex justify-between items-center ${
        selected ? `bg-blue-200` : ""
      }`}
      onClick={handleClickOption}
    >
      {content}
      {selected ? <i className="fa-solid fa-check text-blue-500"></i> : ""}
    </div>
  );
};

export default OptionsBox;
