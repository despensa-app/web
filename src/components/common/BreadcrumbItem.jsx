import {Link} from "react-router-dom";

const BreadcrumbItem = ({active, children, href}) => {
    return (
        <li className={`breadcrumb-item${active ? ' active' : ''}`}>
            {!active && href ? <Link to={href}>{children}</Link> : children}
        </li>
    );
};

export default BreadcrumbItem;