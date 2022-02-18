import styled from "styled-components";
import { Element } from "./Elements";

const button = ({ ...rest }) => Element({ as: "button", ...rest });

export const Button = styled(button)`
  background: ${(props) => (props.color === "main" ? "#D4AF37" : "#2F4F4F")};
  color: ${(props) => (props.color === "main" ? "#2F4F4F" : "#D4AF37")};
  max-width: 150px;
  font-size: 20px;
  margin: 14px;
  padding: 0.25em 1em;
  border: 2px solid #2F4F4F;
  border-radius: 10px;
`;
