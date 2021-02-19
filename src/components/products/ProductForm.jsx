import Content from "../common/Content";
import Card from "../common/Card";
import {InputNumber} from "primereact/inputnumber";
import {useParams, useHistory, Link} from "react-router-dom";
import {useEffect, useState, useContext} from "react";

const ProductForm = () => {

    const {productId} = useParams();

    const history = useHistory();

    const [productName, setProductName] = useState('');

    const [productPrice, setProductPrice] = useState(0.0);

    const [productImgUrl, setProductImgUrl] = useState('');

    const [productCalories, setProductCalories] = useState(0.0);

    const [productDescription, setProductDescription] = useState('');

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    const url = 'http://despensa-app.api/api/products';

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
                    label: productId ? 'Modificar' : 'Nuevo',
                    active: true
                }
            ]
    };

    useEffect(() => {
        if (!productId) {
            return;
        }

        fetch(`${url}/${productId}`)
            .then(response => response.json())
            .then(data => {
                setProductName(data.data.name);
                setProductPrice(data.data.price);
                setProductImgUrl(data.data.img_url);
                setProductCalories(data.data.calories);
                setProductDescription(data.data.description);
            })
            .catch(error => console.log(error));
    }, [productId]);

    const PageHeader = () => (
        <>
            <span>{productId ? 'Modificar' : 'Nuevo'} producto</span>
            {productId && <Link to={`/products/${productId}`} className="btn btn-sm btn-primary">
                Ver producto
            </Link>}
        </>
    );

    const CardFooter = () => (
        <button type="submit" className="btn btn-primary">{productId ? 'Guardar' : 'Crear'}</button>
    );

    const onSubmit = (e) => {
        e.preventDefault();

        if (productId) {
            update();
        } else {
            create();
        }
    };

    const create = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: productName,
                price: productPrice,
                img_url: productImgUrl,
                calories: productCalories,
                description: productDescription
            })
        };

        fetch(`${url}`, requestOptions)
            .then(response => response.json())
            .then(data => history.push(`/products/form/${data.data.id}`))
            .catch(error => console.log(error));
    }

    const update = () => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: productName,
                price: productPrice,
                img_url: productImgUrl,
                calories: productCalories,
                description: productDescription
            })
        };

        fetch(`${url}/${productId}`, requestOptions)
            .catch(error => console.log(error));
    }

    const handleInput = {
        name: (e) => setProductName(e.target.value),
        price: (e) => setProductPrice(e.value),
        imgUrl: (e) => setProductImgUrl(e.target.value),
        calories: (e) => setProductCalories(e.value),
        description: (e) => setProductDescription(e.target.value)
    }

    return (
        <Content pageHeader={<PageHeader/>} breadcrumbItems={breadcrumbItems}>
            <form onSubmit={onSubmit}>
                <Card footer={<CardFooter/>} className="p-fluid">
                    <div className="form-group">
                        <label htmlFor="product_name">Nombre</label>
                        <input type="text" value={productName} onChange={handleInput.name} className="form-control" id="product_name" placeholder="Ingrese el nombre"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product_price">Precio</label>
                        <InputNumber id="product_price" value={productPrice} onValueChange={handleInput.price} mode="currency" currency="EUR" locale="es-ES" inputClassName="form-control" placeholder="Ingrese el precio"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product_calories">Calorías</label>
                        <InputNumber id="product_calories" value={productCalories} onValueChange={handleInput.calories} mode="decimal" minFractionDigits={2} maxFractionDigits={2} inputClassName="form-control" placeholder="Ingrese la cantidad de calorías"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product_description">Descripción (Opcional)</label>
                        <textarea id="product_description" value={productDescription} onChange={handleInput.description} className="form-control" rows="3" placeholder="Ingrese la descripción"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product_img_url">Imagen</label>
                        <input type="url" value={productImgUrl} onChange={handleInput.imgUrl} className="form-control" id="product_img_url" placeholder="Url de la imagen"/>
                    </div>
                </Card>
            </form>
        </Content>
    );
};

export default ProductForm;