import EventList from "@/components/events/event-list";
import NewsletterRegistration from "@/components/input/newsletter-registration";
import { getAllEvents, getFeaturedEvents } from "@/helpers/api-util";
import Head from "next/head";

export default function Home(props) {
    return (
        <div>
            <Head>
                <title>Nextjs event</title>
                <meta
                    name='description'
                    content='Find a lot of great events that allow you to evolve'
                />
            </Head>
            <NewsletterRegistration />
            <EventList items={props.events} />
        </div>
    );
}

export const getStaticProps = async () => {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents,
        },
    };
};
