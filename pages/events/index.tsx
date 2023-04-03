import { getFeaturedEvents } from "../../helpers/api-util";
import EventList from "@/components/events/event-list";
import { Fragment } from "react";
import { useRouter } from "next/router";
import EventsSearch from "../../components/events/search-event";

const EventPage = (props) => {
    // const allEvents = getAllEvents();
    const router = useRouter();

    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`;

        router.push(fullPath);
    }

    return (
        <Fragment>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList items={props.allEvents} />
        </Fragment>
    );
};

export const getStaticProps = async () => {
    const allEvents = await getFeaturedEvents();
    return {
        props: {
            allEvents,
        },
        revalidate: 1800,
    };
};
export default EventPage;
