import {useState, useEffect, useContext} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import Content from "../common/Content";
import Card from "../common/Card";
import Pagination from "../common/Pagination";
import CardProductShopping from "./CardProductShopping";
import {ConfirmDialogContext, LoadingProcessScreenContext, ShowMessagesContext} from "../../App";
import productInitState from "../../assests/requests/product.json";
import BreadCrumbApp from "../../common/BreadCrumbApp";
import productsShoppingListInitState from "../../assests/responses/products-shopping-list.json"
import ProductsRC from "../../services/ProductsRC";
import ProductsShoppingListRC from "../../services/ProductsShoppingListRC";

const Product = () => {

    const {productId} = useParams();

    const [product, setProduct] = useState(productInitState);

    const breadcrumbItems = BreadCrumbApp.product([
        {
            label: product.name,
            active: true
        }
    ]);

    const [productShoppingList, setProductShoppingList] = useState(productsShoppingListInitState)

    const [shoppingListUrlPage, setShoppingListUrlPage] = useState('');

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    const showMessage = useContext(ShowMessagesContext);

    const confirmDialog = useContext(ConfirmDialogContext);

    const history = useHistory();

    useEffect(() => {
        initData();
    }, [productId]);

    const initData = () => {
        loadingProcessScreen.show();
        ProductsRC.get({
            id: productId,
            success: (data) => {
                setProduct(data.data);
                initDataShoppingList();
            },
            error: (data) => {
                showMessage.error(data.error);
                history.push(ProductsRC.getPath());
            }
        });
    };

    const initDataShoppingList = (url = null) => {
        const path = ProductsRC.getPath({path: [productId, 'shopping-list'], host: true});
        const uri = url ? url : path;

        ProductsRC.get({
            uri,
            success: (data) => {
                setProductShoppingList(data);
            },
            error: (data) => {
                if (data && data.error) {
                    showMessage.error(data.error);
                }
            },
            final: loadingProcessScreen.hide
        });
    };

    const onPageClick = (url) => {
        loadingProcessScreen.show();
        setShoppingListUrlPage(url);
        initDataShoppingList(url);
    };

    const onRelationshipDelete = ({product_id, shopping_list_id, unit_type_id}) => {
        loadingProcessScreen.show();
        ProductsShoppingListRC.delete({
            body: {product_id, shopping_list_id, unit_type_id},
            success: () => {
                onPageClick(shoppingListUrlPage);
                showMessage.success({message: "Producto borrado de la lista."});
            },
            error: (data) => {
                if (data && data.error) {
                    showMessage.error(data.error);
                }
            },
            final: loadingProcessScreen.hide
        })
    };

    const onClickDelete = () => {
        loadingProcessScreen.show();
        ProductsRC.delete({
            id: product.id,
            success: () => {
                showMessage.success({message: "Producto borrado."});
                history.push(ProductsRC.getPath());
            },
            error: (data) => {
                if (data && data.error) {
                    showMessage.error(data.error);
                }
            },
            final: loadingProcessScreen.hide
        });
    };

    const deleteConfirmDialog = () => {
        confirmDialog.deleted({
            accept: () => {
                onClickDelete();
            }
        });
    }

    const relationshipDeleteConfirmDialog = (relationship) => {
        confirmDialog.deleted({
            accept: () => {
                onRelationshipDelete(relationship);
            }
        });
    };

    const PageHeader = () => (
        <>
            <span>{product.name} </span>
            <Link to={ProductsRC.getPath({path: [productId, 'form']})} className="btn btn-primary">
                <i className="fas fa-edit"/>
            </Link>
            <button className="btn btn-danger" type="button" onClick={deleteConfirmDialog}>
                <i className="fas fa-trash"/>
            </button>
        </>
    );

    return (
        <Content pageHeader={<PageHeader/>} breadcrumbItems={breadcrumbItems}>
            <Card>
                <div className="row">
                    <div className="col-8">
                        <dl className="row mb-0">
                            <dt className="col-sm-2">Descripción</dt>
                            <dd className="col-sm-10">{product.description}</dd>
                            <dt className="col-sm-2">Precio</dt>
                            <dd className="col-sm-10">{product.price} €</dd>
                            <dt className="col-sm-2">Calorías</dt>
                            <dd className="col-sm-10">{product.calories} kcal</dd>
                        </dl>
                    </div>
                    <div className="col-4">
                        <img src={product.img_url} alt="product" className="img-rounded img-fluid w-50"/>
                    </div>
                </div>
            </Card>
            <Card title="Listas de la compra">
                <div className="row d-flex align-items-stretch">
                    {
                        productShoppingList.data.map((relationship, i) => (
                            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch"
                                 key={`product-relationship-${i}`}>
                                <CardProductShopping title={relationship.shopping_list.name}
                                                     unitTypes={relationship.unit_type.name}
                                                     units={relationship.units_per_product}
                                                     onDelete={() => relationshipDeleteConfirmDialog(relationship)}
                                                     hrefEdit="/"
                                                     hrefView={`/shopping-list/${relationship.shopping_list_id}`}/>
                            </div>
                        ))
                    }
                </div>
                <Pagination
                    links={productShoppingList.meta.links}
                    onClick={onPageClick}
                    nameKey="product-relationship"/>
            </Card>
        </Content>
    );
};

export default Product;