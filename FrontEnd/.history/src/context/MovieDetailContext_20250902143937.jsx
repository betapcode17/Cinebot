import { createContext, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import YouTube from "react-youtube";
import { getMovieDetail } from "../api/movieApi"; // KKPhim API

// B1: Tạo Context
const MovieContext = createContext();

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 1,
  },
};

const MovieProvider = ({ children }) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  // 🔹 Hàm mở trailer (KKPhim có thể không có trailer)
  const handleVideoTrailer = async (slug) => {
    try {
      const data = await getMovieDetail(slug); // lấy chi tiết phim
      // Giả sử KKPhim trả trailer ở data.trailer (YouTube URL hoặc key)
      if (data.trailer) {
        setTrailerUrl(data.trailer);
        setIsOpen(true);
      } else {
        console.warn("Không tìm thấy trailer cho phim này");
        alert("Trailer chưa có sẵn cho phim này!");
      }
    } catch (error) {
      console.error("Lỗi khi load trailer:", error);
      alert("Có lỗi khi tải trailer, vui lòng thử lại sau.");
    }
  };

  return (
    <MovieContext.Provider value={{ handleVideoTrailer }}>
      {children}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: { position: "fixed", zIndex: 9999 },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            padding: "0",
            border: "none",
            background: "transparent",
          },
        }}
        contentLabel="Trailer Modal"
      >
        {trailerUrl && (
          <div className="flex items-center justify-center">
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        )}
      </Modal>
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MovieProvider, MovieContext };
