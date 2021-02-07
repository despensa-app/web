import {useState, useEffect} from "react";
import Card from "../common/Card";
import Pagination from "../common/Pagination";
import Content from "../common/Content";
import Link from "../common/Link";
import CardProduct from "./CardProduct";

const Products = () => {

    const urlBase = 'http://despensa-app.api/api/products';

    const productsData = {
        "data": [
            {
                "id": 1,
                "name": "laborum",
                "price": 5534.91,
                "img_url": "https://via.placeholder.com/640x480.png/006655?text=molestiae",
                "calories": 3469.43,
                "description": "Sit error dolores mollitia qui natus non aut. Facilis ut molestiae cumque ut et vel. Omnis magnam et nihil enim voluptatem.",
                "created_at": 1612031862,
                "updated_at": 1612031862
            }
        ],
        "links": {
            "first": "http://despensa-app.api/api/products?page=1",
            "last": "http://despensa-app.api/api/products?page=67",
            "prev": null,
            "next": "http://despensa-app.api/api/products?page=2"
        },
        "meta": {
            "current_page": 1,
            "from": 1,
            "last_page": 67,
            "links": [
                {
                    "url": "http://despensa-app.api/api/products?page=1",
                    "label": 1,
                    "active": true
                }
            ],
            "path": "http://despensa-app.api/api/products",
            "per_page": 15,
            "to": 15,
            "total": 1000
        }
    };

    const [products, setProducts] = useState(productsData);

    const [url, setUrl] = useState(urlBase);

    useEffect(() => {
        fetch(`${url}`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.log(error));
    }, [url]);

    const PageHeader = () => (
        <>
            <span>Productos </span>
            <Link href="/products/form" preClassIcon="fas fa-plus" btnColor="success"/>
        </>
    );

    const breadcrumbItems =
        {
            home: {
                preIconClassName: 'fas fa-home',
                url: '/'
            },
            items:
                [
                    {
                        label: 'Productos',
                        active: true
                    }
                ]
        };

    const onPageClick = (url) => {
        setUrl(url);
    };

    return (
        <Content pageHeader={<PageHeader/>} breadcrumbItems={breadcrumbItems}>
            <Card>
                <div className="row d-flex align-items-stretch">
                    {
                        products.data.map((product, i) => (
                            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch"
                                 key={`products-${i}`}>
                                <CardProduct {...product}/>
                            </div>
                        ))
                    }
                </div>
                <Pagination
                    links={products.meta.links}
                    onClick={onPageClick}
                    nameKey="product-relationship"/>
            </Card>
        </Content>
    );
};

export default Products;