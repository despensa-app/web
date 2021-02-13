import Content from "../common/Content";
import Card from "../common/Card";
import {InputNumber} from "primereact/inputnumber";
import {useParams, useHistory} from "react-router-dom";
import {useEffect, useState, useRef} from "react";

const ProductForm = () => {

    const {productId} = useParams();

    const history = useHistory();


    const url = 'http://despensa-app.api/api/products';

    const productData = {
        "id": 0,
        "name": '',
        "price": 0,
        "img_url": '',
        "calories": 0,
        "description": ''
    }

    const [product, setProduct] = useState(productData);

    const productNameRef = useRef(null);
    const [productPrice, setProductPrice] = useState(0);
    const [productCalories, setProductCalories] = useState(0);
    const productDescriptionRef = useRef(null);
    const productImgUrlRef = useRef(null);


    const PageHeader = () => (
        <>
            <span>{productId ? 'Modificar' : 'Nuevo'} producto</span>
        </>
    );

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

    const CardFooter = () => (
        <button type="submit" className="btn btn-primary">{productId ? 'Guardar' : 'Crear'}</button>
    );

    useEffect(() => {
        if (!productId) {
            return;
        }

        fetch(`${url}/${productId}`)
            .then(response => response.json())
            .then(data => setProduct(data.data))
            .catch(error => console.log(error));
    }, [productId]);

    useEffect(() => {
        productNameRef.current.value = product.name;
        setProductPrice(product.price);
        setProductCalories(product.calories);
        productDescriptionRef.current.value = product.description;
        productImgUrlRef.current.value = product.img_url;
    }, [product]);

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
            body: JSON.stringify(
                {
                    "name": productNameRef.current.value,
                    "price": productPrice,
                    "img_url": productImgUrlRef.current.value,
                    "calories": productCalories,
                    "description": productDescriptionRef.current.value
                }
            )
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
            body: JSON.stringify(
                {
                    "name": productNameRef.current.value,
                    "price": productPrice,
                    "img_url": productImgUrlRef.current.value,
                    "calories": productCalories,
                    "description": productDescriptionRef.current.value
                }
            )
        };

        fetch(`${url}/${productId}`, requestOptions)
            .catch(error => console.log(error));
    }

    return (
        <Content pageHeader={<PageHeader/>} breadcrumbItems={breadcrumbItems}>
            <form onSubmit={onSubmit}>
                <Card footer={<CardFooter/>} className="p-fluid">
                    <div className="form-group">
                        <label htmlFor="product_name">Nombre</label>
                        <input type="text" ref={productNameRef} className="form-control" id="product_name" placeholder="Ingrese el nombre"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product_price">Precio</label>
                        <InputNumber id="product_price" value={productPrice} onValueChange={(e) => setProductPrice(e.value)} mode="currency" currency="EUR" locale="es-ES" inputClassName="form-control" placeholder="Ingrese el precio"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product_calories">Calorías</label>
                        <InputNumber id="product_calories" value={productCalories} onValueChange={(e) => setProductCalories(e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={2} inputClassName="form-control" placeholder="Ingrese la cantidad de calorías"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product_description">Descripción (Opcional)</label>
                        <textarea id="product_description" ref={productDescriptionRef} className="form-control" rows="3" placeholder="Ingrese la descripción"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product_img_url">Imagen</label>
                        <input type="url" ref={productImgUrlRef} className="form-control" id="product_img_url" placeholder="Url de la imagen"/>
                    </div>
                </Card>
            </form>
        </Content>
    );
};

export default ProductForm;