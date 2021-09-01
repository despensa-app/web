import clsx from "clsx";
import ListGroupItem from "./ListGroupItem";

const ListGroup = ({children, variant}) => {
    const prefix = "list-group";

    return (
        <div className={clsx(prefix, variant && `${prefix}-${variant}`)}>
            {children}
        </div>
    );
};

export default Object.assign(ListGroup, {
    Item: ListGroupItem
})