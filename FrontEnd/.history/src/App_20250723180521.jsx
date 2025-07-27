import "./index.css";
import { useState } from "react";
import Header from "./components/Header.jsx";
import Banner from "./components/Banner.jsx";
import MovieList from "./components/MovieList.jsx";

function App() {
  //Tên biến movies để lưu trữ danh sách phim
  //Sử dụng useState để quản lý trạng thái của danh sách phim
  //Ban đầu, danh sách phim là một mảng rỗng
  //setMovies là hàm để cập nhật danh sách phim
  //Ví dụ: setMovies([{ id: 1, title: "Phim 1" }, { id: 2, title: "Phim 2" }])
  const [movies, setMovies] = useState([]);

  console.log(movies.length);
  setMovies([{ id: 1, title: "Hello World" }]);
  return (
    <div className="bg-black pb-10">
      <Header />
      <Banner />
      <MovieList title={"phim Hot"} />
      <MovieList title={"phim Hành Động"} />
    </div>
  );
}

export default App;
