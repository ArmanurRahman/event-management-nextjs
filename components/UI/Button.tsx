import Link from "next/link";
import Classes from "./button.module.css";

const Button = (props) => {
    const { link, children } = props;
    return (
        <Link href={link} className={Classes.btn}>
            {children}
        </Link>
    );
};

export default Button;
