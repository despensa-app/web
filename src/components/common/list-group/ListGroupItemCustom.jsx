import clsx from "clsx";

const ListGroupItemCustom = ({children, type, active}) => {
    return (
        <div className={clsx(`list-group-item-${type}`, {"button-active": active})}>
            {children}
        </div>
    );
};

export default ListGroupItemCustom;