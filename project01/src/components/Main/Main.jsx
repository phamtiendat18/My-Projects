import "./Main.css";
import { useEffect, useRef, useState } from "react";
import Options from "../Options/Options";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import ReactPaginate from "react-paginate";

const Main = () => {
  const limit = 10;
  const navigate = useNavigate();
  const initialOptions = ["delectus", "aut", "officia", "porro", "adipisci"];
  const inputRef = useRef();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [pageCount, setPageCount] = useState(10);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const getData = async () => {
      const request = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_page=${page}`
      );
      const totalTodo = await request.headers.get("X-Total-Count");
      if (request.status === 200) {
        const data = await request.json();
        const totalPage = await Math.ceil(totalTodo / limit);
        setPageCount(totalPage);
        setTodos(data);
        setLoading(false);
      }
    };
    getData();
  }, [page]);
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/tim-kiem?keyWord=${inputRef.current.value}`, {
      state: inputRef.current.value,
    });
  };
  const getData = ({ value, show }) => {
    setShow(show);
    if (value) {
      inputRef.current.value
        ? (inputRef.current.value = `${inputRef.current.value.trim()} ${value}`)
        : (inputRef.current.value = value);
    }
  };
  const handleClick = ({ selected }) => {
    setPage(selected);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" p-[30px]">
          <div className="flex justify-end">
            <div className="relative">
              <h2 className="font-medium text-xl">Tìm kiếm công việc</h2>
              <form
                className="border-2 px-[15px] py-[5px] border-cyan-500 rounded-full"
                // onBlur={() => setShow(false)}
                onSubmit={handleSubmit}
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Công việc bạn muốn tìm..."
                  className="outline-0 mr-[5px]"
                  name="keyWord"
                  onClick={() => setShow(true)}
                  autoComplete="off"
                />
                <button>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
              {show ? (
                <Options options={initialOptions} onData={getData} />
              ) : (
                ""
              )}
              {/* <Options options={initialOptions} onData={getData} /> */}
            </div>
          </div>
          <h2 className="text-2xl font-bold py-3">Danh sách công việc</h2>
          {todos.length ? (
            <>
              <table className="w-full border-collapse border border-black p-[10px]">
                <tbody>
                  <tr className=" text-center bg-green-300">
                    <th className="border border-black p-[10px]">STT</th>
                    <th className="border border-black p-[10px]">
                      Tên công việc
                    </th>
                    <th className="border border-black p-[10px]">Trạng thái</th>
                  </tr>
                  {todos.map(({ id, title, completed }, index) => {
                    return (
                      <tr
                        key={id}
                        className=" text-center border border-black p-[10px]"
                      >
                        <td className="border border-black p-[10px]">
                          {index + 1}
                        </td>
                        <td className=" text-left border border-black p-[10px]">
                          {title}
                        </td>
                        <td className="border border-black p-[10px]">
                          {completed ? "Hoàn thành" : "Chưa hoàn thành"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="w-full flex justify-center my-[15px]">
                <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  pageCount={pageCount}
                  onPageChange={handleClick}
                  containerClassName={"pagination"}
                  previousLinkClassName={"paginationLink"}
                  nextLinkClassName={"paginationLink"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={1}
                />
              </div>
            </>
          ) : (
            <div>
              <h1 className="text-3xl font-bold">Không có công việc nào</h1>
              <a href=""></a>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Main;
