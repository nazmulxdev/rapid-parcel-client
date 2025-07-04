import React from "react";
import { Link, Navigate } from "react-router";

const Forbidden = () => {
  return (
    <div>
      <h2>Forbidden</h2>
      <Link to="/" className="btn btn-primary">
        Return to home
      </Link>
    </div>
  );
};

export default Forbidden;
