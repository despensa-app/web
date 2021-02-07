import adminLTRLogo from 'admin-lte/dist/img/AdminLTELogo.png';
import NavSidebar from "./nav/NavSidebar";

const Aside = () => {
    const title = "Despensa app";

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="/" className="brand-link">
                <img src={adminLTRLogo} alt={title} className="brand-image img-circle elevation-3"/>
                <span className="brand-text font-weight-light">{title}</span>
            </a>

            <div className="sidebar">
                <NavSidebar/>
            </div>
        </aside>
    );
};

export default Aside;