import Link from "next/link";
import Classes from "./button.module.css";

const Button = (props) => {
    const { link, children } = props;
    if (props.link) {
        return (
            <Link href={link} className={Classes.btn}>
                {children}
            </Link>
        );
    }
    return (
        <button className={Classes.btn} onClick={props.onClick}>
            {props.children}
        </button>
    );
};

export default Button;
