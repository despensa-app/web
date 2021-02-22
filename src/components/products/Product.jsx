import {useState, useEffect, useContext} from "react";
import {Link, useParams} from "react-router-dom";
import Content from "../common/Content";
import Card from "../common/Card";
import Pagination from "../common/Pagination";
import CardProductShopping from "./CardProductShoppin";
import {LoadingProcessScreenContext} from "../../App";

const Product = () => {

    const url = 'http://despensa-app.api/api/products';

    const urlRelationship = 'http://despensa-app.api/api/products-shopping-list';

    const {productId} = useParams();

    const productData = {
        "data": {
            "id": 45,
            "name": "totam",
            "price": 7087.57,
            "img_url": "https://via.placeholder.com/640x480.png/000055?text=quidem",
            "calories": 725.32,
            "description": "Dolorem debitis perferendis vitae saepe vel fuga. In architecto sed nisi delectus. Praesentium ut qui ab laboriosam est vero facere.",
            "created_at": 1610219098,
            "updated_at": 1610219098,
            "product_shopping_list": [
                {
                    "units_per_product": 10,
                    "total_calories": 7253.2,
                    "total_price": 70875.7,
                    "product_id": 45,
                    "shopping_list_id": 25,
                    "unit_type_id": 29,
                    "unit_type": {
                        "id": 29,
                        "name": "tempore",
                        "created_at": 1610219098,
                        "updated_at": 1610219098
                    },
                    "shopping_list": {
                        "id": 25,
                        "name": "asperiores",
                        "total_calories": 415411.34,
                        "total_price": 541168.29,
                        "created_at": 1610219098,
                        "updated_at": 1610219099
                    },
                    "product": {
                        "id": 45,
                        "name": "totam",
                        "price": 7087.57,
                        "img_url": "https://via.placeholder.com/640x480.png/000055?text=quidem",
                        "calories": 725.32,
                        "description": "Dolorem debitis perferendis vitae saepe vel fuga. In architecto sed nisi delectus. Praesentium ut qui ab laboriosam est vero facere.",
                        "created_at": 1610219098,
                        "updated_at": 1610219098
                    }
                }
            ]
        }
    };

    const shoppingListData = {
        "data": [
            {
                "units_per_product": 74,
                "total_calories": 122805.96,
                "total_price": 28474.46,
                "product_id": 841,
                "shopping_list_id": 130,
                "unit_type_id": 835,
                "unit_type": {
                    "id": 835,
                    "name": "et",
                    "created_at": 1612031860,
                    "updated_at": 1612031860
                },
                "shopping_list": {
                    "id": 130,
                    "name": "libero",
                    "total_calories": 84489433.41,
                    "total_price": 84604481.57,
                    "created_at": 1612031866,
                    "updated_at": 1612031986
                },
                "product": {
                    "id": 841,
                    "name": "architecto",
                    "price": 384.79,
                    "img_url": "https://via.placeholder.com/640x480.png/00aa00?text=eaque",
                    "calories": 1659.54,
                    "description": "Quae quia commodi est officia. Ducimus beatae sit cumque in quis reprehenderit est incidunt. Ducimus consequuntur nobis sit cupiditate porro porro ut.",
                    "created_at": 1612031865,
                    "updated_at": 1612031865
                }
            }
        ],
        "links": {
            "first": "http://despensa-app.api/api/products/841/shopping-list?page=1",
            "last": "http://despensa-app.api/api/products/841/shopping-list?page=7",
            "prev": null,
            "next": "http://despensa-app.api/api/products/841/shopping-list?page=2"
        },
        "meta": {
            "current_page": 1,
            "from": 1,
            "last_page": 7,
            "links": [
                {
                    "url": null,
                    "label": "&laquo; Previous",
                    "active": false
                }
            ],
            "path": "http://despensa-app.api/api/products/841/shopping-list",
            "per_page": 15,
            "to": 15,
            "total": 102
        }
    };

    const [product, setProduct] = useState(productData);

    const breadcrumbItems = {
        home: {
            preIconClassName: 'fas fa-home',
            url: '/'
        },
        items:
            [
                {
                    label: 'Productos',
                    url: '/products'
                },
                {
                    label: product.data.name,
                    active: true
                }
            ]
    };

    const [shoppingList, setShoppingList] = useState(shoppingListData)

    const [shoppingListUrlPage, setShoppingListUrlPage] = useState('');

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    useEffect(() => {
        loadingProcessScreen.show();
        fetch(`${url}/${productId}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.log(error));
        fetch(`${url}/${productId}/shopping-list`)
            .then(response => response.json())
            .then(data => setShoppingList(data))
            .catch(error => console.log(error))
            .finally(loadingProcessScreen.hide);
    }, [productId]);

    const onPageClick = (url) => {
        url = url ? url : `${url}/${productId}/shopping-list`;

        loadingProcessScreen.show();
        setShoppingListUrlPage(url);
        fetch(url)
            .then(response => response.json())
            .then(data => setShoppingList(data))
            .catch(error => console.log(error))
            .finally(loadingProcessScreen.hide);
    };

    const onRelationshipDelete = ({product_id, shopping_list_id, unit_type_id}) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    "product_id": product_id,
                    "shopping_list_id": shopping_list_id,
                    "unit_type_id": unit_type_id
                }
            )
        };

        loadingProcessScreen.show();
        fetch(urlRelationship, requestOptions)
            .then(response => {
                if (response.ok) {
                    onPageClick(shoppingListUrlPage);
                }
            })
            .catch(error => console.log(error));
    };

    const PageHeader = () => (
        <>
            <span>{product.data.name} </span>
            <Link to={`/products/form/${productId}`} className="btn btn-primary">
                <i className="fas fa-edit"/>
            </Link>
            <Link to="/" className="btn btn-danger">
                <i className="fas fa-trash"/>
            </Link>
        </>
    );

    return (
        <Content pageHeader={<PageHeader/>} breadcrumbItems={breadcrumbItems}>
            <Card>
                <div className="row">
                    <div className="col-8">
                        <dl className="row mb-0">
                            <dt className="col-sm-2">Descripción</dt>
                            <dd className="col-sm-10">{product.data.description}</dd>
                            <dt className="col-sm-2">Precio</dt>
                            <dd className="col-sm-10">{product.data.price} €</dd>
                            <dt className="col-sm-2">Calorías</dt>
                            <dd className="col-sm-10">{product.data.calories} kcal</dd>
                        </dl>
                    </div>
                    <div className="col-4">
                        <img src={product.data.img_url} alt="product" className="img-rounded img-fluid w-50"/>
                    </div>
                </div>
            </Card>
            <Card title="Listas de la compra">
                <div className="row d-flex align-items-stretch">
                    {
                        shoppingList.data.map((relationship, i) => (
                            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch"
                                 key={`product-relationship-${i}`}>
                                <CardProductShopping title={relationship.shopping_list.name}
                                                     unitTypes={relationship.unit_type.name}
                                                     units={relationship.units_per_product}
                                                     onDelete={() => onRelationshipDelete(relationship)}
                                                     hrefEdit="/"
                                                     hrefView={`/shopping-list/${relationship.shopping_list_id}`}/>
                            </div>
                        ))
                    }
                </div>
                <Pagination
                    links={shoppingList.meta.links}
                    onClick={onPageClick}
                    nameKey="product-relationship"/>
            </Card>
        </Content>
    );
};

export default Product;