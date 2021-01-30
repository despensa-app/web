const Footer = ({version}) => (
    <footer className="main-footer">
        <div className="float-right d-none d-sm-block">
            <b>Versión</b> {version}
        </div>
        Diseño base <strong>adminlte</strong>
    </footer>
);

export default Footer;