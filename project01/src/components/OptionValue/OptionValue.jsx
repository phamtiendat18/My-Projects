const OptionValue = ({ content }) => {
  return (
    <div
      className="bg-slate-100 p-[7px] rounded-[5px] flex justify-between items-center gap-[10px] leading-[15px] mr-[10px]"
      key={id}
      contentEditable={false}
    >
      {content}
      <i
        className="fa-solid fa-xmark text-[13px] cursor-pointer"
        onClick={handleDelete}
      ></i>
    </div>
  );
};

export default OptionValue;
