import "./index.css";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    // Hàm này sẽ được gọi khi component được mount
    // Ở đây bạn có thể gọi API để lấy dữ liệu phim
    // Ví dụ: fetch('https://api.example.com/movies')
    // .then(response => response.json())
    // .then(data => setMovies(data));
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/movies`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
    // Hiện tại, chúng ta chỉ cần console.log để kiểm tra
    console.log("Component mounted, fetching movies...");
  }, []); // Mảng rỗng [] đảm bảo hàm chỉ chạy một lần khi component mount
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
