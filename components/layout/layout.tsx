import { Fragment } from "react";
import Header from "./hearder";

const Layout = (props) => {
    return (
        <Fragment>
            <Header />
            <main>{props.children}</main>
        </Fragment>
    );
};

export default Layout;
