import React from "react";
import styled from "styled-components";

const Container = styled.form({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

function Loader() {
  return <Container>Loading...</Container>;
}

export default Loader;
