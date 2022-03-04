import React, { useEffect } from "react";
import styled from "styled-components";
import Loader from "../component/Loader";
import useGetInvoice from "../hook/api/useGetInvoice";
import { useParams, useNavigate } from "react-router-dom";
import ReactJson from "react-json-view";
import moment from "moment";

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const Title = styled.h3({});

const Desc = styled.p({
  fontSize: 16,
  marginBottom: 10,
});

function Invoice() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [invoice, loading] = useGetInvoice(id);
  const {
    status = "SETTLED",
    paid_amount = 0,
    paid_at,
    payment_method,
  } = invoice || {};

  useEffect(() => {
    if (status === "SETTLED" || status === "PAID") {
      return;
    }

    navigate(`/${id}`);
  }, [status]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Title>Your payment was successful!</Title>
      <Desc>Amount Paid: {(paid_amount / 1000).toFixed(3)}</Desc>
      <Desc>Date Paid: {moment(paid_at).format("DD MMM YYYY hh:mma")}</Desc>
      <Desc>Payment Channel: {payment_method}</Desc>
    </Container>
  );
}

export default Invoice;
