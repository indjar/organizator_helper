import React from "react";

export const Field = ({label, ...rest}) => {
    const {name, type, placeholder, defaultValue} = rest;

    return (
        <React.Fragment>
            <label style={{display: "block", 
                            fontSize: "1.6rem", 
                            fontWeight: "700", 
                            marginBottom: "0.5rem"}} 
                    htmlFor={name}>{label || name}</label>
                <input
                    style={{ appearance: "none",
                        backgroundColor: "transparent",
                        border: "0.1rem solid #d1d1d1",
                        borderRadius: "0.4rem",
                        boxShadow: "none",
                        boxSizing: "inherit",
                        height: "2.8rem",
                        padding: "0.6rem 1rem",
                        width: "80%",
                        lineHeight: "normal",
                        marginBottom: "1.5rem"}}
                    className="input"
                    type={type || "text"}
                    name={name}
                    placeholder={placeholder || name}
                    defaultValue={defaultValue}
                    {...rest}
                />
        </React.Fragment>
    );
};
