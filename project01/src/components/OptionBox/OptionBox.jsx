import { useState } from "react";

const OptionBox = ({ value, onValues }) => {
  const { id, content, selected } = value;
  // console.log(value);
  const [check, setCheck] = useState(selected);
  const handleClickOption = (e) => {
    onValues({ id, content, selected: !check });
    setCheck(!check);
  };
  return (
    <div
      className=" max-h-[30px] px-[10px] py-[5px] bg-white rounded-[10px] hover:bg-slate-200 flex justify-between items-center"
      onClick={handleClickOption}
    >
      {content}
      {check ? <i className="fa-solid fa-check text-blue-500"></i> : ""}
    </div>
  );
};

export default OptionBox;
