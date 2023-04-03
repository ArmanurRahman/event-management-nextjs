import { Fragment } from "react";
// import { useRouter } from "next/router";

import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/result-tiles";
import Button from "../../components/UI/Button";
import ErrorAlert from "../../components/UI/error-alert";

const FilterEventsPage = (props) => {
    // const router = useRouter();

    // const filterData = router.query.slug;

    // if (!filterData) {
    //     return <p className='center'>Loading...</p>;
    // }

    // const filteredYear = filterData[0];
    // const filteredMonth = filterData[1];

    // const numYear = +filteredYear;
    // const numMonth = +filteredMonth;

    const { hasError, filteredEvents } = props;

    if (hasError) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    // const filteredEvents = getFilteredEvents({
    //     year: numYear,
    //     month: numMonth,
    // });
    // console.log({ numYear });
    // console.log({ numMonth });
    // console.log({ filteredEvents });
    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const date = new Date(props.date.numYear, props.date.numMonth - 1);

    return (
        <Fragment>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    );
};

export const getServerSideProps = async (context) => {
    const filteredYear = context.params.slug[0];
    const filteredMonth = context.params.slug[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12
    ) {
        return {
            hasError: true,
            // notFound: true,
            // redirect: {
            //     destination: "/error",
            // },
        };
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

    return {
        props: {
            filteredEvents: filteredEvents,
            date: {
                numYear,
                numMonth,
            },
        },
    };
};
export default FilterEventsPage;
