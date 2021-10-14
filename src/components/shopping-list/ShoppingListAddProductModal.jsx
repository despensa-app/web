import {useEffect, useState} from "react";
import $ from 'jquery';
import Modal from "../common/modal/Modal";
import Button from "../common/button/Button";
import Form from "../common/form/Form";
import {InputNumber} from "primereact/inputnumber";
import requestInitState from "../../services/init-state/requests/product-shopping-list.json"

const ShoppingListAddProductModal = ({modalId, product, unitType, addHandle, unitTypeHandle, closeHandle}) => {

    const [request, setRequest] = useState(requestInitState);

    const [resetRequest, setResetRequest] = useState(false);

    useEffect(() => {
        if (resetRequest) {
            setResetRequest(false);
            setRequest(requestInitState);
        }

        if (request.units_per_product === 0) {
            setRequest({...request, units_per_product: 1});
        }
    });

    useEffect(() => {
        setRequest({...request, product_id: product.id});
    }, [product.id]);

    useEffect(() => {
        setRequest({...request, unit_type_id: unitType.id});
    }, [unitType.id]);

    const closeModalHandle = () => {
        $(`#${modalId}`).modal('hide');
        setResetRequest(true);
        closeHandle();
    };

    const onChangeInput = (evt) => {
        setRequest({...request, [evt.target.name]: evt.target.value})
    };

    const addProductHandle = () => {
        addHandle({
            ...request,
            successHandle: () => {
                closeModalHandle();
            }
        });
    };

    return (
        <Modal
            id={modalId}
            keyboard={false}
            backdrop="static">
            <Modal.Header>
                <Modal.Header.Title>
                    {product.name}
                </Modal.Header.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
                <Form className="p-3 d-flex">
                    <div>
                        <Form.Label htmlFor="units_per_product">
                            Unidades
                        </Form.Label>
                        <InputNumber
                            id="units_per_product"
                            className="d-block"
                            value={request.units_per_product}
                            name="units_per_product"
                            onValueChange={onChangeInput}
                            inputClassName="form-control"
                            placeholder="Ingrese la cantidad de calorías"/>
                    </div>
                    <div className="flex-grow-1" onClick={unitTypeHandle}>
                        <Form.Label htmlFor="unit_type_name">
                            Tipo de unidades
                        </Form.Label>
                        <Form.Control
                            id="unit_type_name"
                            type="text"
                            name="unit_type_name"
                            value={unitType.name}
                            disabled/>
                    </div>
                </Form>
                <img
                    src={product.img_url}
                    alt={product.name}
                    className="img-fluid"/>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <Button variant="default" onClick={closeModalHandle}>
                    <i className="fas fa-long-arrow-alt-left"/>
                </Button>
                <Button variant="success" onClick={addProductHandle}>
                    <i className="fas fa-check"/>
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ShoppingListAddProductModal;