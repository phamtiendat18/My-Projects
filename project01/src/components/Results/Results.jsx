import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const word = location.state;
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const request = await fetch(
        `https://jsonplaceholder.typicode.com/todos?title_like=${word}`
      );
      if (request.status === 200) {
        const data = await request.json();
        setResults(data);
        setLoading(false);
      }
    };
    getData();
  }, [word]);
  const handleBack = () => {
    navigate("/");
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="text-2xl font-bold py-3">Danh sách tìm kiếm</h1>
          <button
            className="bg-green-400 rounded-[5px] p-[10px] text-white mb-[10px]"
            onClick={handleBack}
          >
            Quay lay lại trang chủ
          </button>
          {results.length ? (
            <table className="w-full border-collapse border border-black p-[10px]">
              <tbody>
                <tr className=" text-center bg-green-300">
                  <th className="border border-black p-[10px]">STT</th>
                  <th className="border border-black p-[10px]">
                    Tên công việc
                  </th>
                  <th className="border border-black p-[10px]">Trạng thái</th>
                </tr>
                {results.map(({ id, title, completed }, index) => {
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
          ) : (
            <h1>
              Không tìm thấy kết quả nào với từ khóa: <i>{word}</i>
            </h1>
          )}
        </div>
      )}
    </>
  );
};

export default Results;
