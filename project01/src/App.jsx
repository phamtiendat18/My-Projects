import Header from "./components/Hearder/Header";
import Main from "./components/Main/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Results from "./components/Results/Results";

const Layout = ({ children }) => (
  <div>
    <Header />
    {children}
    {/* Footer, etc. */}
  </div>
);
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/tim-kiem" element={<Results />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
