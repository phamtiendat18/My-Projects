const SelectedOption = ({ value, onOption }) => {
  const { id, content, selected } = value;
  const handleDelete = () => {
    onOption({ id, content, selected: false });
  };
  return (
    <div
      className="bg-slate-100 p-[7px] rounded-[5px] flex justify-between items-center gap-[10px] leading-[15px]"
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

export default SelectedOption;
