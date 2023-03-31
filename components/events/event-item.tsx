import Link from "next/link";
import AddressIcon from "../icons/address-icon";
import ArrowRight from "../icons/arrow-right";
import DateIcon from "../icons/date-icon";
import Button from "../UI/Button";
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
                    <DateIcon />
                    <time>{humanReadableDate}</time>
                </div>
                <div className={Classes.address}>
                    <AddressIcon />
                    <address>{formatAddress}</address>
                </div>
            </div>

            <div className={Classes.actions}>
                <Button link={`/events/${id}`}>
                    <span>Explore event</span>
                    <span className={Classes.icon}>
                        <ArrowRight />
                    </span>
                </Button>
            </div>
        </li>
    );
};

export default EventItem;
