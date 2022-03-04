import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import useFetch from "use-http";
import Loader from "../component/Loader";
import useGetInvoice from "../hook/api/useGetInvoice";
import { useParams, useNavigate } from "react-router-dom";
import useQueryInvoice from "../hook/api/useQueryInvoice";
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

const SubTitle = styled.h4({});

const Amount = styled.h1({});

const Content = styled.div({
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
});

const Wallet = styled.p({
  fontSize: 16,
  padding: 20,
});

const JsonContainer = styled.div({
  maxHeight: 500,
});

function Invoice() {
  const { id = "" } = useParams();
  const [invoice] = useQueryInvoice(id);
  const navigate = useNavigate();

  const {
    status = "PENDING",
    external_id,
    expiry_date,
    currency,
    amount = 0,
    available_ewallets,
  } = invoice || {};

  useEffect(() => {
    if (status !== "SETTLED" && status !== "PAID") {
      return;
    }

    // window.location.href = `https://checkout-staging.xendit.co/web/${id}#bri`;

    navigate(`/${id}/completed`);
  }, [status]);

  return (
    <Container>
      <Title>Reference: {external_id}</Title>
      <SubTitle>
        PAY BEFORE: {moment(expiry_date).format("DD MMM YYYY hh:mma")}
      </SubTitle>
      <Amount>
        {currency} {(amount / 1000).toFixed(3)}
      </Amount>
      <SubTitle>Available E-Wallet</SubTitle>
      <Content>
        {available_ewallets?.map(({ ewallet_type }) => (
          <Wallet>{ewallet_type}</Wallet>
        ))}
      </Content>
    </Container>
  );
}

export default Invoice;
