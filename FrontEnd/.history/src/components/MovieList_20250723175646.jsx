import React from "react";
import PropTypes from "prop-types";
const MovieList = ({ title }) => {
  return (
    <div
      className="text-white p-10
  mb-10"
    >
      {title}
    </div>
  );
};

//Truyền PropTypes để kiểm tra kiểu dữ liệu của props
MovieList.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MovieList;
