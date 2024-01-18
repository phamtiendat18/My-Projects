import { useRef, useState } from "react";
import OptionsBox from "../OptionsBox/OptionsBox";
import SelectedOption from "../SelectedOption/SelectedOption";
// import "./SelectBox.css";
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
  const [hover, setHover] = useState(false);
  const optRef = useRef();
  const selectRef = useRef();
  const actionRef = useRef();
  const inputRef = useRef();
  const [filter, setFilter] = useState("");
  const [values, setValues] = useState(initialOptions);
  const handleClick = (e) => {
    inputRef.current.focus();
    if (selectRef.current.isEqualNode(e.target)) {
      setShow(!show);
    }
  };
  const getValues = (value) => {
    setFilter("");
    const newArr = values.map((item) => {
      if (item.id === value.id) {
        item.selected = value.selected;
      }
      return item;
    });
    console.log(newArr);
    setValues(newArr);
  };
  const removeAccents = (str) => {
    const accents =
      "ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỠỢỤỦỨỪỬỮỰỲỴÝỶỸửữựỳỵỷỹý";
    const withoutAccents =
      "AAAAEEEIIOOOOUUADIUOaaaaeeeeiioooouuadiuoUAAAAAAAAAAAAAEEEEEEuaaaaaaaaaaaaaeeeeeeEEIIOOOOOOOOOOOOUUUUeeiiooooooooooOOUUUUUUUYYYYYuuuyyyyy";
    return str
      .split("")
      .map((char, index) => {
        const accentIndex = accents.indexOf(char);
        return accentIndex !== -1 ? withoutAccents[accentIndex] : char;
      })
      .join("");
  };
  const handleSearchOption = (e) => {
    setShow(true);
    const inputValue = e.target.value.toLowerCase().trim();
    const inputResult = removeAccents(inputValue);
    setFilter(inputResult);
    // console.log(filter);
  };
  const handleDeleteAll = () => {
    const data = values.map((item) => {
      item.selected = false;
      return item;
    });
    setValues(data);
  };
  const handleKeyboard = (e) => {
    if (!filter && (e.key === "Backspace" || e.key === "Delete")) {
      const arr = values.filter((item) => {
        return item.selected;
      });
      arr[arr.length - 1].selected = false;
      getValues(arr[arr.length - 1]);
      // console.log(arr[arr.length - 1]);
    }
    if (e.key === "Enter") {
      const arr = values.filter((item) => {
        return removeAccents(item.content.toLowerCase().trim()).includes(
          filter
        );
      });
      arr[0].selected = !arr[0].selected;
      getValues(arr[0]);
    }
  };
  return (
    <div
      className="relative w-[500px] mx-auto my-[30px]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className=" min-h-[30px] rounded-[10px] border border-[1px] flex items-center p-[7px] flex-wrap gap-[10px]"
        onClick={handleClick}
        ref={selectRef}
      >
        {values.map((value) => {
          if (value.selected) {
            return (
              <SelectedOption
                value={value}
                key={value.id}
                onOption={getValues}
              />
            );
          }
        })}
        <input
          className="p-[7px] outline-0"
          onInput={handleSearchOption}
          onKeyDown={handleKeyboard}
          onClick={() => setShow(!show)}
          ref={inputRef}
          value={filter}
        />
      </div>
      <div
        className="absolute top-[50%] right-[10px] -translate-y-[50%] cursor-pointer"
        ref={actionRef}
      >
        {hover ? (
          <i
            className="fa-regular fa-circle-xmark text-sm text-slate-500 hover:text-black hover:bg-slate-300 rounded-[50%] w-[20px] flex items-center justify-center"
            onClick={handleDeleteAll}
          ></i>
        ) : show ? (
          <i className="fa-solid fa-magnifying-glass text-sm text-slate-500"></i>
        ) : (
          <i className="fa-solid fa-chevron-down text-sm text-slate-500"></i>
        )}
      </div>
      {show ? (
        <div
          className="absolute shadow-md w-full max-h-[200px] rounded-[10px] bg-white p-[10px] overflow-auto"
          style={{ top: "calc(100% + 5px)", left: 0 }}
          contentEditable={false}
          ref={optRef}
        >
          {values.map((value, index) => {
            if (
              filter &&
              removeAccents(value.content.toLowerCase().trim()).includes(filter)
            ) {
              return (
                <OptionsBox key={index} value={value} onValues={getValues} />
              );
            }
            if (!filter) {
              return (
                <OptionsBox key={index} value={value} onValues={getValues} />
              );
            }
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SelectBox;
