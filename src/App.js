import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 6;
  const [progress, setProgress] = useState(0);
  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar color="#f11946" progress={progress} height={3} />
        <Routes>
          <Route exact path="/NewsMonkey" element={<News setProgress={setProgress} key="business" pageSize={pageSize} country="in" category="business"/>}></Route>

          <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}></Route>

          <Route exact path="/health" element={<News setProgress={setProgress} key="health" pageSize={pageSize} country="in" category="health"/>}></Route>

          <Route exact path="/politics" element={<News setProgress={setProgress}key="politics" pageSize={pageSize} country="in" category="politics"/>}></Route>

          <Route exact path="/science" element={<News setProgress={setProgress}key="science" pageSize={pageSize} country="in" category="science"
              />}></Route>

          <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={pageSize} country="in" category="sports"/>}></Route>

          <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={pageSize} country="in" category="technology"/>}></Route>

        </Routes>
      </Router>
    </div>
  );
};

export default App;
