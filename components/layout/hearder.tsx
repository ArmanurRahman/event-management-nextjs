import Link from "next/link";
import Classes from "./header.module.css";

const Header = () => {
    return (
        <header className={Classes.header}>
            <div className={Classes.logo}>
                <Link href={"/"}>Next Events</Link>
            </div>
            <nav className={Classes.navigation}>
                <ul>
                    <li>
                        <Link href={"/events"}>All Events</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
