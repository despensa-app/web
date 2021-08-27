import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";
import clsx from "clsx";

const Card = ({children, className}) => {
    return (
        <div className={clsx('card', className)}>
            {children}
        </div>
    );
};

export default Object.assign(Card, {
    Header: CardHeader,
    Body: CardBody,
    Footer: CardFooter
});