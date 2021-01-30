const BreadcrumbItem = ({active, children, href}) => {
    return (
        <li className={`breadcrumb-item${active ? ' active' : ''}`}>
            {!active && href ? <a href={href}>{children}</a> : children}
        </li>
    );
};

export default BreadcrumbItem;