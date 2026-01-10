import { createContext, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import YouTube from "react-youtube";
import { getTrailer } from "../api/movieApi";

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

  const handleVideoTrailer = async (movieId) => {
    try {
      const data = await getTrailer(movieId); // 🔥 gọi API sẵn có
      const trailer = data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      if (trailer) {
        setTrailerUrl(trailer.key);
        setIsOpen(true);
      } else {
        console.warn("Không tìm thấy trailer phù hợp");
      }
    } catch (error) {
      console.error("Lỗi khi load trailer:", error);
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
          },
        }}
        contentLabel="Trailer Modal"
      >
        {trailerUrl && (
          <div className="flex items-center justify-center mt-5">
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
