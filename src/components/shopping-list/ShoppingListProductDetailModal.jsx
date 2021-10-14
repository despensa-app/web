import Modal from "../common/modal/Modal";
import Button from "../common/button/Button";
import $ from 'jquery';

const ShoppingListProductDetailModal = ({productDetailModalId, productShoppingList}) => {

    const {product, unit_type, units_per_product, total_calories, total_price} = productShoppingList;

    const closeModalHandle = () => {
        $(`#${productDetailModalId}`).modal('hide');
    }

    return (
        <Modal id={productDetailModalId}>
            <Modal.Header>
                <Modal.Header.Title>
                    {product.name}
                </Modal.Header.Title>
                <Button className="close" onClick={closeModalHandle}>
                    <i className="fas fa-times"/>
                </Button>
            </Modal.Header>
            <Modal.Body className="p-0">
                <div className="d-flex p-3 border-bottom">
                    <div className="flex-grow-1">
                        {total_price} € <small className="text-muted">{product.price} €</small>
                    </div>
                    <div className="flex-grow-1">
                        {total_calories}
                        <small className="text-muted"> {product.calories}</small>
                    </div>
                    <div>
                        <span className="badge badge-info">
                            {units_per_product} {unit_type.name}
                        </span>
                    </div>
                </div>
                <img src={product.img_url} alt={product.name} className="img-fluid img-rounded"/>
            </Modal.Body>
        </Modal>
    );
}

export default ShoppingListProductDetailModal;