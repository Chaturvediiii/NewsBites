import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 6;
  const [progress, setProgress] = useState(0);
  const api_key = process.env.REACT_APP_NEWS_API_KEY;
  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar color="#f11946" progress={progress} height={3} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={setProgress}
                apiKey={api_key}
                key="business"
                pageSize={pageSize}
                category="business"
              />
            }
          ></Route>

          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                apiKey={api_key}
                key="entertainment"
                pageSize={pageSize}
                category="entertainment"
              />
            }
          ></Route>

          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={setProgress}
                apiKey={api_key}
                key="health"
                pageSize={pageSize}
                category="health"
              />
            }
          ></Route>

          <Route
            exact
            path="/politics"
            element={
              <News
                setProgress={setProgress}
                apiKey={api_key}
                key="politics"
                pageSize={pageSize}
                category="politics"
              />
            }
          ></Route>

          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={setProgress}
                apiKey={api_key}
                key="science"
                pageSize={pageSize}
                category="science"
              />
            }
          ></Route>

          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                apiKey={api_key}
                key="sports"
                pageSize={pageSize}
                category="sports"
              />
            }
          ></Route>

          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                apiKey={api_key}
                key="technology"
                pageSize={pageSize}
                category="technology"
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
