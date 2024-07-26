import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/tournaments");
  }, [navigate]);
  return (
    <>


    </>
  );
};

export default Home;
