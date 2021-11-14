import NavbarNavItem from "./NavbarNavItem";
import NavbarNav from "./NavbarNav";
import {useNavbarItems} from "../../../hooks/useNavbarItems";

const Navbar = () => {

    const items = useNavbarItems();

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
                {
                    items.middle.map((value, i) => (
                        <NavbarNavItem key={`navbar-nav-item-middle-${i}`}>
                            {value}
                        </NavbarNavItem>
                    ))
                }
            </NavbarNav>
            <NavbarNav>
                {
                    items.right.map((value, i) => (
                        <NavbarNavItem key={`navbar-nav-item-right-${i}`}>
                            {value}
                        </NavbarNavItem>
                    ))
                }
            </NavbarNav>
        </nav>
    );
};

export default Navbar;