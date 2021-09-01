import clsx from "clsx";
import Button from "../button/Button";

const ItemLi = ({children, prefix, className}) => {
    return (
        <li className={clsx(prefix, className)}>
            {children}
        </li>
    );
}

const ItemButton = ({children, prefix, className, onClick}) => {
    return (
        <Button
            className={clsx(prefix, `${prefix}-action`, className)}
            onClick={onClick}>
            {children}
        </Button>
    );
}

const ListGroupItem = ({children, action, className, onClick}) => {
    const prefix = "list-group-item";

    return (
        <>
            {action && <ItemButton
                onClick={onClick}
                children={children}
                action={action}
                className={className}
                prefix={prefix}/>}
            {!action && <ItemLi
                children={children}
                action={action}
                className={className}
                prefix={prefix}/>}
        </>
    );
};

export default ListGroupItem;