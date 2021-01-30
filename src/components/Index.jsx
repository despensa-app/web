import Aside from './Aside';
import Footer from './Footer';
import Content from "./Content";
import Nav from "./Nav";
import Product from "./Product";

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