import Aside from './common/Aside';
import Footer from './common/Footer';
import Content from "./common/Content";
import Nav from "./common/nav/Nav";
import Product from "./products/Product";

const Index = () => {
    const version = "1.0.0";

    return (
        <>
            <Nav/>
            <Aside/>
            {/*<Content/>*/}
            <Product/>
            <Footer version={version}/>
        </>
    );
};

export default Index;