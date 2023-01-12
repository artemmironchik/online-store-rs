import React, { FC } from "react";
import { Link, Navigate } from "react-router-dom";

const NotFoundPage: FC = () => {
  return (
    <div className="absolute h-full w-full inset-0 justify-center items-center text-2xl flex flex-col gap-3 z-0">
      <p>Page not found</p>
      <Link to="/" className="text-blue-600">
        Go to Main
      </Link>
    </div>
  );
};
export const NotFoundRedirect = () => <Navigate to="/404" />;
export default NotFoundPage;