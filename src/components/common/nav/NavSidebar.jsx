import {Link} from "react-router-dom";

const NavItem = ({href, children, preClassIcon}) => (
    <li className="nav-item">
        <Link to={href} component={NavLink} preClassIcon={preClassIcon}>
            {children}
        </Link>
    </li>
);

const NavItemTree = ({name, children}) => (
    <li className="nav-item">
        <NavLink href="/" preClassIcon="fas fa-circle" postClassIcon="fas fa-angle-left">
            {name}
        </NavLink>
        <ul className="nav nav-treeview">
            {children}
        </ul>
    </li>
);

const NavHeader = ({children}) => (
    <li className="nav-header">{children}</li>
);

const NavLink = ({href, children, preClassIcon, postClassIcon}) => (
    <a href={href} className="nav-link">
        <i className={`${preClassIcon} nav-icon`}/>
        <p>
            {children}
            {postClassIcon && <i className={`${postClassIcon} right`}/>}
        </p>
    </a>
);

const NavSidebar = () => (
    <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <NavItem href="/shopping-list" preClassIcon="far fa-circle">
                Lista de la compra
            </NavItem>
        </ul>
    </nav>
);

export default NavSidebar;