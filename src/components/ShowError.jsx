import React from "react";

const ShowError = ({children}) => {
    return (
        <div className="mt-1 mb-2 bg-light text-center text-danger border border-1 border-danger 
        rounded-pill p-2">
            {children}
        </div>
    )
}

export default ShowError;