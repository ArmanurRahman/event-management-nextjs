import { getAllEvents } from "../../data/dummy-data";
import EventList from "@/components/events/event-list";
import { Fragment } from "react";
import { useRouter } from "next/router";
import EventsSearch from "../../components/events/search-event";

const EventPage = () => {
    const allEvents = getAllEvents();
    const router = useRouter();

    function findEventsHandler(year, month) {
        const fullPath = `/events/${year}/${month}`;

        router.push(fullPath);
    }

    return (
        <Fragment>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList items={allEvents} />
        </Fragment>
    );
};

export default EventPage;
