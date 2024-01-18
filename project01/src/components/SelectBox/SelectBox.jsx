import { useRef, useState } from "react";
import OptionBox from "../OptionBox/OptionBox";

const initialOptions = [
  {
    id: 1,
    content: "Phạm Tiến Đạt",
    selected: false,
  },
  {
    id: 2,
    content: "Bùi Quang Trưởng",
    selected: false,
  },
  {
    id: 3,
    content: "Đặng Xuân Tiến",
    selected: false,
  },
  {
    id: 4,
    content: "Nguyễn Thị Phương Thanh",
    selected: false,
  },
  {
    id: 5,
    content: "Nguyễn Thị Tím",
    selected: false,
  },
  {
    id: 6,
    content: "Phạm Văn Quyển",
    selected: false,
  },
  {
    id: 7,
    content: "Phạm Văn Tuệ",
    selected: false,
  },
  {
    id: 8,
    content: "Phạm Thị Thu Lý",
    selected: false,
  },
  {
    id: 9,
    content: "Trần Văn Linh",
    selected: false,
  },
  {
    id: 10,
    content: "Trần Phạm An Nhiên",
    selected: false,
  },
  {
    id: 11,
    content: "Nguyễn Thị Giang",
    selected: false,
  },
  {
    id: 12,
    content: "Phạm Nguyệt Ngân",
    selected: false,
  },
  {
    id: 13,
    content: "Phạm Gia Hưng",
    selected: false,
  },
];

const SelectBox = () => {
  const [show, setShow] = useState(false);
  const [values, setValues] = useState([]);
  const [datas, setDatas] = useState([]);
  const optRef = useRef();
  const selectRef = useRef();
  const handleClick = (e) => {
    if (selectRef.current.isEqualNode(e.target)) {
      setShow(!show);
    }

    // console.log(optRef.current);
  };
  const getValues = (value) => {
    setValues((prev) => {
      const check = values.map(({ id }) => id).includes(value.id);
      console.log(check);
      if (check) {
        return values.filter((item) => item.id !== value.id);
      }
      return [...prev, value];
    });
    console.log(value);
  };
  const handleDelete = (e) => {
    // console.log();
    const value = e.target.parentElement.innerText;
    console.log("value:", value);
    setValues((prev) => {
      return values.filter(({ id, content, selected }) => {
        if (content.trim() === value.trim()) {
          selected = false;
        }
        return content !== value;
      });
    });
  };
  return (
    <div className="relative">
      <div
        className="w-[500px] min-h-[30px] rounded-[10px] border border-[1px] flex items-center p-[7px] flex-wrap"
        onClick={handleClick}
        ref={selectRef}
      >
        {values.map(({ id, content, selected }) => (
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
        ))}
        <div className="p-[7px] outline-0" contentEditable={true}></div>
      </div>
      {show ? (
        <div
          className="absolute shadow-md w-full h-[200px] rounded-[10px] bg-white p-[10px] overflow-auto"
          style={{ top: "calc(100% + 5px)", left: 0 }}
          contentEditable={false}
          ref={optRef}
        >
          {initialOptions.map((value, index) => {
            return <OptionBox key={index} value={value} onValues={getValues} />;
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SelectBox;
