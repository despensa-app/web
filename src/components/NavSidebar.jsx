const NavItem = ({item}) => (
    <li className="nav-item">
        <a href={item.href} className="nav-link">
            <i className="far fa-circle nav-icon"/>
            <p>{item.name}</p>
        </a>
    </li>
);

const NavSidebar = ({items}) => (
    <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            {
                items.map((item, i) => <NavItem key={i} item={item}/>)
            }
        </ul>
    </nav>
);

export default NavSidebar;