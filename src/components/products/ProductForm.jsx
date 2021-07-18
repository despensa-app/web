import {useParams, useHistory, Link} from "react-router-dom";
import {useEffect, useState, useContext} from "react";
import Content from "../common/Content";
import Card from "../common/Card";
import {InputNumber} from "primereact/inputnumber";
import {LoadingProcessScreenContext, ShowMessagesContext} from "../../App";
import BreadCrumbApp from "../../common/BreadCrumbApp";
import productInitState from "../../assests/requests/product.json";
import ProductsRC from "../../services/ProductsRC";

const ProductForm = () => {

    const {productId} = useParams();

    const history = useHistory();

    const [product, setProduct] = useState(productInitState);

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    const showMessage = useContext(ShowMessagesContext);

    const breadcrumbItems = BreadCrumbApp.product([
        {
            label: product.id ? 'Modificar' : 'Nuevo',
            active: true
        }
    ]);

    useEffect(() => {
        if (!productId) {
            return;
        }

        loadingProcessScreen.show();
        ProductsRC.get({
            id: productId,
            success: ({data}) => {
                setProduct(data);
            },
            error: (data) => {
                if (data && data.error) {
                    showMessage.error(data.error);
                }
            },
            final: loadingProcessScreen.hide
        })
    }, [productId]);

    const PageHeader = () => (
        <>
            <span>{product.id ? 'Modificar' : 'Nuevo'} producto</span>
            {product.id && <Link to={ProductsRC.getPath({path: [product.id]})} className="btn btn-sm btn-primary">
                Ver producto
            </Link>}
        </>
    );

    const CardFooter = () => (
        <button type="submit" className="btn btn-primary">{product.id ? 'Guardar' : 'Crear'}</button>
    );

    const onSubmit = (e) => {
        e.preventDefault();
        loadingProcessScreen.show();

        if (product.id) {
            update();
        } else {
            create();
        }
    };

    const create = () => {
        ProductsRC.post({
            body: product,
            id: product.id,
            success: ({data}) => {
                showMessage.success({messages: "Producto creado."});
                history.push(ProductsRC.getPath({path: [data.id, 'form']}));
            },
            error: (data) => {
                if (data && data.error) {
                    showMessage.error(data.error);
                }
            },
            final: loadingProcessScreen.hide
        });
    }

    const update = () => {
        ProductsRC.put({
            body: product,
            id: product.id,
            success: () => {
                showMessage.success({messages: "Producto actualizado."});
            },
            error: (data) => {
                if (data && data.error) {
                    showMessage.error(data.error);
                }
            },
            final: loadingProcessScreen.hide
        });
    }

    const onChangeInput = (evt) => {
        setProduct({...product, [evt.target.name]: evt.target.value})
    }

    return (
        <Content pageHeader={<PageHeader/>} breadcrumbItems={breadcrumbItems}>
            <form onSubmit={onSubmit}>
                <Card footer={<CardFooter/>} className="p-fluid">
                    <div className="form-group">
                        <label htmlFor="product_name">Nombre</label>
                        <input
                            type="text"
                            value={product.name}
                            name="name"
                            onChange={onChangeInput}
                            className="form-control"
                            id="product_name"
                            placeholder="Ingrese el nombre"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product_price">Precio</label>
                        <InputNumber
                            id="product_price"
                            value={product.price}
                            name="price"
                            onValueChange={onChangeInput}
                            mode="currency"
                            currency="EUR"
                            locale="es-ES"
                            inputClassName="form-control"
                            placeholder="Ingrese el precio"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product_calories">Calorías</label>
                        <InputNumber
                            id="product_calories"
                            value={product.calories}
                            name="calories"
                            onValueChange={onChangeInput}
                            mode="decimal"
                            minFractionDigits={2}
                            maxFractionDigits={2}
                            inputClassName="form-control"
                            placeholder="Ingrese la cantidad de calorías"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product_description">Descripción (Opcional)</label>
                        <textarea
                            id="product_description"
                            value={product.description}
                            name="description"
                            onChange={onChangeInput}
                            className="form-control"
                            rows="3"
                            placeholder="Ingrese la descripción"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product_img_url">Imagen</label>
                        <input
                            id="product_img_url"
                            value={product.img_url}
                            name="img_url"
                            onChange={onChangeInput}
                            type="url"
                            className="form-control"
                            placeholder="Url de la imagen"/>
                    </div>
                </Card>
            </form>
        </Content>
    );
};

export default ProductForm;