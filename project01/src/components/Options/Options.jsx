import { useEffect, useRef } from "react";

const Options = ({ options, onData }) => {
  //   const [show, setShow] = useState(true);
  const selectRef = useRef();
  const handleClick = (e) => {
    const value = e.target.innerText;
    onData({ value: value, show: true });
  };
  const handleClickOutSide = (e) => {
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      onData({ show: false });
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  });
  return (
    <div
      className="absolute rounded-[5px] bg-white p-[5px] w-full shadow-md h-[100px] overflow-y-auto"
      style={{ top: `calc(100% + 10px)` }}
      ref={selectRef}
    >
      {options.map((option, index) => (
        <div
          key={index}
          onClick={handleClick}
          className="text-center hover:bg-slate-300 rounded-[5px] hover:cursor-pointer "
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default Options;
