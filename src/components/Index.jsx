import Aside from './Aside';
import Footer from './Footer';
import Content from "./Content";
import Nav from "./Nav";
import 'admin-lte/plugins/bootstrap/js/bootstrap.min'
import 'admin-lte/dist/js/adminlte';

const Index = () => {
    const version = "1.0.0";

    return (
        <div className="hold-transition sidebar-mini layout-fixed">
            <div className="wrapper">
                <Nav/>
                <Aside/>
                <Content/>
                <Footer version={version}/>
            </div>
        </div>
    );
};

export default Index;