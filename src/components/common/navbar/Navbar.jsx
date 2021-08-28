import NavbarNavItem from "./NavbarNavItem";
import NavbarNav from "./NavbarNav";

const Navbar = () => {
    return (
        <nav className="main-header navbar navbar-expand fixed-bottom navbar-white navbar-light d-flex justify-content-between">
            <NavbarNav>
                <NavbarNavItem>
                    <button className="btn" data-widget="pushmenu" type="button">
                        <i className="fas fa-bars"/>
                    </button>
                </NavbarNavItem>
            </NavbarNav>
            <NavbarNav>
                <NavbarNavItem>
                    <button className="btn btn-success" type="button">
                        <i className="fas fa-plus pr-1"/>
                        <span>Nuevo</span>
                    </button>
                </NavbarNavItem>
            </NavbarNav>
            <NavbarNav>
                <NavbarNavItem>
                    <button className="btn" type="button">
                        <i className="fas fa-search"/>
                    </button>
                </NavbarNavItem>
            </NavbarNav>
        </nav>
    );
};

export default Navbar;