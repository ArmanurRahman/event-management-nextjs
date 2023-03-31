import Link from "next/link";
import Classes from "./event-item.module.css";

const EventItem = (props) => {
    const { id, title, address, image, date } = props;

    const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const formatAddress = address.replace(",", "\n");
    return (
        <li className={Classes.item}>
            <img src={`/${image}`} alt={title} />
            <div className={Classes.content}>
                <div className={Classes.summary}>
                    <h2>{title}</h2>
                </div>
                <div className={Classes.date}>
                    <time>{humanReadableDate}</time>
                </div>
                <div className={Classes.address}>{formatAddress}</div>
            </div>

            <div className={Classes.actions}>
                <Link href={`/events/${id}`}>Explore event</Link>
            </div>
        </li>
    );
};

export default EventItem;
