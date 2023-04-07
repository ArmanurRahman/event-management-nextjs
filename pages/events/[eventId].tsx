import { Fragment } from "react";
import { useRouter } from "next/router";

import { getEventById } from "../../helpers/api-util";
import EventSummary from "../../components/events/event-details/event-summary";
import EventLogistics from "../../components/events/event-details/event-logistics";
import EventContent from "../../components/events/event-details/event-content";
import ErrorAlert from "../../components/UI/error-alert";
import { getFeaturedEvents } from "@/data/dummy-data";
import Comments from "@/components/input/comments";

function EventDetailPage(props) {
    const { selectedEvent } = props;
    // console.log(selectedEvent);
    // const router = useRouter();

    // const eventId = router.query.eventId;
    // const event = getEventById(eventId);

    if (!selectedEvent) {
        return (
            <ErrorAlert>
                <p>No event found!</p>
            </ErrorAlert>
        );
    }

    return (
        <Fragment>
            <EventSummary title={selectedEvent.title} />
            <EventLogistics
                date={selectedEvent.date}
                address={selectedEvent.location}
                image={selectedEvent.image}
                imageAlt={selectedEvent.title}
            />
            <EventContent>
                <p>{selectedEvent.description}</p>
            </EventContent>
            <Comments eventId={selectedEvent.id} />
        </Fragment>
    );
}

export const getStaticProps = async (context) => {
    const eventId = context.params.eventId;
    const selectedEvent = await getEventById(eventId);
    if (!selectedEvent) {
        return {
            notFound: true,
        };
    }
    // console.log(selectedEvent);
    return {
        props: {
            selectedEvent: selectedEvent,
        },
    };
};

export const getStaticPaths = async () => {
    const featuredEvents = await getFeaturedEvents();
    const paramWithEventId = featuredEvents.map((event) => ({
        params: { eventId: event.id },
    }));
    return {
        paths: paramWithEventId,
        fallback: "blocking",
    };
};
export default EventDetailPage;
