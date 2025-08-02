const Pagination = ({ currentPage,totalPages,onPageChange }) => {
    const pages =[currentPage - 1, currentPage, currentPage + 1].filter(page => page > 0 && page <= totalPages);
    return ( 
        <div className="flex justify-center mt-6 space-x-2">
        
        </div>
    );