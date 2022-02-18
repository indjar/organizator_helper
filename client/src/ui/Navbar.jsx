import { Element } from "./Elements.jsx";
import styled from "styled-components";


export const Header = ({ ...rest }) =>
    Element({ as: "header", ...rest });

const navbar = ({ ...rest }) =>
    Element({ as: "div", ...rest });

const title1 = ({ ...rest }) =>
    Element({ as: "h1", ...rest });

const title3 = ({ ...rest }) =>
    Element({ as: "h3", ...rest });

const navi = ({ ...rest }) =>
    Element({ as: "div", ...rest });

export const Item = ({ as, ...rest }) =>
    Element({ as, ...rest });

const footer = ({ ...rest }) =>
    Element({ as: "footer", ...rest });


export const Navbar = styled(navbar)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    background-color:#D4AF37;
    max-width: 100%;
    max-height:15%;
    top:0;
    left:0;
    right: 0;
    box-shadow: 0 2px 2px #616161;
`;

export const Navi = styled(navi)`
    display: flex;
    flex-direction: row;
    list-style-type: none;
    padding: 0 0 2% 0;
    margin: 0 5% 0 0;
`;

export const Title1 = styled(title1)`
    text-align: left;
    margin: 5px 0 0 15px;
    font-size: 0;
`
    ;

export const Title3 = styled(title3)`
    display:block
    text-align: center;
    overflow-wrap: break-word;
    margin-right: 20px;
`
    ;

export const Footer = styled(footer)`
    background-color:#D4AF37;
    position:fixed;
    bottom:0;
    width:100%;
    height:60px;;
    box-shadow: 0 2px 2px #616161;
`
    ;