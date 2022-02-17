import styled from "styled-components";
import { Element } from "./Elements";

export const Main = ({ ...rest }) =>
    Element({ as: "main", ...rest });

const paragra = ({ ...rest }) =>
    Element({ as: "p", ...rest });

const container = ({ ...rest }) =>
    Element({ as: "div", ...rest });

const list = ({ ...rest }) =>
    Element({ as: "div", ...rest });

const block = ({ ...rest }) =>
    Element({ as: "div", ...rest });

const form = ({ ...rest }) =>
    Element({ as: "form", ...rest });

const title1 = ({ ...rest }) =>
    Element({ as: "h1", ...rest });

const title3 = ({ ...rest }) =>

    Element({ as: "h3", ...rest });

const title4 = ({ ...rest }) =>
    Element({ as: "h4", ...rest });

const label = ({ ...rest }) =>
    Element({ as: "label", ...rest });

const select = ({ ...rest }) =>
    Element({ as: "select", ...rest });


export const Container = styled(container)`
    display: flex;
    justify-content: flex-end;
    margin-top: 3rem;
`
    ;
export const Form = styled(form)`
    display: block;
    width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ffca28;
    border-radius: 5px;
`
    ;
export const Title3 = styled(title3)`
    display:block
    text-align: center;
    overflow-wrap: break-word;
    color:#D4AF37;
    font-size: 28px;
`
    ;
export const Title1 = styled(title1)`
    text-align: center;
    text-size: 24px;
`
    ;
export const Title4 = styled(title4)`
    text-align: center;
    color: #ffca28;

`
    ;
export const Block = styled(block)`
    border: solid 2px #ffca28;
    width: 80%;
    height: 20%;
    flex: 1 ;
    margin: 2%;
    text-align: center;
    padding: 30px 0 30px 0;
    font-size: 18px;
    padding: 10px;
    align-content: center;
`
    ;
export const List = styled(list)`
    display: flex;
    flex-direction:column;
    align-items: center;
    
`;
export const Paragra = styled(paragra)`
    overflow-wrap: break-word;
    color:#D4AF37;
`;

export const Label=styled(label)`
    display: block; 
    font-size: 1.6rem; 
    font-weight: 700; 
    margin-bottom: 0.5rem;
    color:#D4AF37;
    `
    ;
export const Select = styled(select)`
    appearance: none;
    background-color: transparent;
    border: 0.1rem solid #D4AF37;
    color:#D4AF37;
    font-weight:500;
    border-radius: 0.4rem;
    box-shadow: none;
    box-sizing: inherit;
    height: 2.8rem;
    padding: 0.6rem 1rem;
    width: 80%;
    line-height: normal;
    margin-bottom: 1.5rem;
    `
    ;