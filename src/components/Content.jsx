import Breadcrumb from "./Breadcrumb";
import Card from "./Card";
import {useState} from "react";

const Content = () => {
    const pages = [
        {
            name: "Home",
            href: '/',
            active: false
        },
        {
            name: "Blank Page",
            active: true
        },

    ]
    const [pageName] = useState('Blank Page');
    const [pagesBreadcrumb] = useState(pages);

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>{pageName}</h1>
                        </div>
                        <div className="col-sm-6">
                            <Breadcrumb pages={pagesBreadcrumb}/>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <Card/>
            </section>
        </div>
    );
};

export default Content;