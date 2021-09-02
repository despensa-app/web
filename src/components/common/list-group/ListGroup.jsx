import clsx from "clsx";
import ListGroupItem from "./ListGroupItem";
import ListGroupItemCustom from "./ListGroupItemCustom";

const ListGroup = ({children, variant, className}) => {
    const prefix = "list-group";

    return (
        <div className={clsx(prefix, variant && `${prefix}-${variant}`, className)}>
            {children}
        </div>
    );
};

export default Object.assign(ListGroup, {
    Item: Object.assign(ListGroupItem, {
        Custom: ListGroupItemCustom
    })
})