import EventItem from "./event-item";

const EventList = (props) => {
    const { items } = props;
    return (
        <ul>
            {items.map((item) => (
                <EventItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    address={item.location}
                    image={item.image}
                    date={item.date}
                />
            ))}
        </ul>
    );
};

export default EventList;
