import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";
import clsx from "clsx";

const Card = ({children, variant, className, onClick}) => {
    const prefix = "card";

    return (
        <div
            className={clsx(prefix, variant && `${prefix}-${variant}`, className)}
            onClick={onClick}>
            {children}
        </div>
    );
};

export default Object.assign(Card, {
    Header: CardHeader,
    Body: CardBody,
    Footer: CardFooter
});