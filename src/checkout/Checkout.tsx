import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Loader from "../component/Loader";
import useCreateInvoice from "../hook/api/useCreateInvoice";

const Container = styled.form({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const Input = styled.input({
  height: 35,
  width: 200,
  marginBottom: 15,
});

const Button = styled.button({
  height: 35,
  width: 200,
});

function Checkout() {
  const [amount, setAmount] = useState("10000");
  const [, loading, create] = useCreateInvoice();
  const navigate = useNavigate();

  function onChange({ target }: ChangeEvent<HTMLInputElement>) {
    setAmount(target.value);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { id } = await create(+amount);

    window.open(`https://checkout-staging.xendit.co/web/${id}`);
    navigate(`/${id}`);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <Container onSubmit={onSubmit}>
      <Input type="number" value={amount} onChange={onChange} />
      <Button>Check Out</Button>
    </Container>
  );
}

export default Checkout;
