import {useState, useEffect, useContext} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import Content from "../common/Content";
import Card from "../common/Card";
import Pagination from "../common/Pagination";
import CardProductShopping from "./CardProductShoppin";
import {LoadingProcessScreenContext, ShowMessagesContext} from "../../App";
import productInitState from "../../assests/responses/products.json";
import BreadCrumbApp from "../../common/breadCrumbApp";
import productsShoppingListInitState from "../../assests/responses/products-shopping-list.json"
import ProductsRC from "../../services/ProductsRC";
import routes from "../../assests/routes.json";

const Product = () => {

    const urlRelationship = 'http://despensa-app.api/api/products-shopping-list';

    const {productId} = useParams();

    const [product, setProduct] = useState(productInitState);

    const breadcrumbItems = BreadCrumbApp.product([
        {
            label: product.data.name,
            active: true
        }
    ]);

    const [shoppingList, setShoppingList] = useState(productsShoppingListInitState)

    const [shoppingListUrlPage, setShoppingListUrlPage] = useState('');

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    const showMessage = useContext(ShowMessagesContext);

    const history = useHistory();

    useEffect(() => {
        initData();
    }, [productId]);

    const initData = () => {
        loadingProcessScreen.show();
        ProductsRC.get({
            id: productId,
            success: (data) => {
                setProduct(data);
                initDataShoppingList();
            },
            error: (data) => {
                showMessage.error(data.error);
                history.push(ProductsRC.getPath());
            }
        });
    };

    const initDataShoppingList = (url = null) => {
        const path = ProductsRC.getPath([productId, 'shopping-list']);
        const uri = url ? url : routes.host + path;

        ProductsRC.get({
            uri,
            success: (data) => {
                setShoppingList(data);
            },
            error: (data) => showMessage.error(data.error),
            final: loadingProcessScreen.hide
        });
    };

    const onPageClick = (url) => {
        loadingProcessScreen.show();
        setShoppingListUrlPage(url);
        initDataShoppingList(url);
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
            <Link to={ProductsRC.getPath([productId, 'form'])} className="btn btn-primary">
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