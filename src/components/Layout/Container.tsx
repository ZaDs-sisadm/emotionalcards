import React from "react";

interface Props {
    children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
    return <main className="container">{children}</main>;
};

export default Container;
