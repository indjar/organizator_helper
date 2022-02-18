import React from 'react';
import { Link } from "react-router-dom";
import { Button } from '../ui/Button';
import { Block, Title3 } from '../ui/Main';

export const WrongPage = () => {
  return <Block style={{ marginTop: "180px", borderColor: "red" }}>
    <Title3 style={{ color: "red" }}> Something went wrong </Title3>
    <Button color="main">
      <Link style={{ color: "#2F4F4F", textDecoration: "none" }} to="/" > Home Page </Link>
    </Button>
  </Block>;
};