const NavItem = ({href, children, preClassIcon}) => (
    <li className="nav-item">
        <NavLink href={href} preClassIcon={preClassIcon}>
            {children}
        </NavLink>
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

const NavSidebar = ({items}) => (
    <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            {
                items.map(
                    (item, i) =>
                        <NavItem key={i} href={item.href} preClassIcon="far fa-circle">
                            {item.name}
                        </NavItem>
                )
            }
            <NavHeader>MULTI LEVEL EXAMPLE</NavHeader>
            <NavItem href="/" preClassIcon="fas fa-circle">Level 1</NavItem>
            <NavItemTree name="Level 1">
                <NavItem href="/" preClassIcon="far fa-circle">
                    Level 2
                </NavItem>
                <NavItemTree name="Level 2">
                    <NavItem href="/" preClassIcon="far fa-dot-circle">
                        Level 3
                    </NavItem>
                    <NavItem href="/" preClassIcon="far fa-dot-circle">
                        Level 3
                    </NavItem>
                </NavItemTree>
                <NavItem href="/" preClassIcon="far fa-circle">
                    Level 2
                </NavItem>
            </NavItemTree>
        </ul>
    </nav>
);

export default NavSidebar;