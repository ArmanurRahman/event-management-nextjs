import NotificationContext from "@/store/notification-context";
import { Fragment, useContext } from "react";
import Notification from "../UI/notification";
import Header from "./hearder";

const Layout = (props) => {
    const notificationCtx = useContext(NotificationContext);

    const activeNotification = notificationCtx.notification;
    return (
        <Fragment>
            <Header />
            <main>{props.children}</main>
            {activeNotification && (
                <Notification
                    title={activeNotification.title}
                    message={activeNotification.message}
                    status={activeNotification.status}
                />
            )}
        </Fragment>
    );
};

export default Layout;
