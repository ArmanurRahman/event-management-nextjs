import Layout from "@/components/layout/layout";
import { NotificationContextProvider } from "@/store/notification-context";
import type { AppProps } from "next/app";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <NotificationContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </NotificationContextProvider>
    );
}
