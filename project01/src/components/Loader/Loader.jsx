import "./Loader.css";
const Loader = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
