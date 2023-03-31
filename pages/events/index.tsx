import { getAllEvents } from "../../data/dummy-data";
import EventList from "@/components/events/event-list";

const EventPage = () => {
    const allEvents = getAllEvents();
    return <EventList items={allEvents} />;
};

export default EventPage;
