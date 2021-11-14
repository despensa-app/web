import {Link} from "react-router-dom";
import Button from "../common/button/Button";

const ShoppingListButtonAddProduct = ({
    shoppingListId = null,
    isEdit = true,
    addProductHandle = null
}) => {
    const showButtonAddProduct = () => {
        return isEdit && shoppingListId;
    };

    const showButtonAddProductCreateList = () => {
        return !shoppingListId && addProductHandle;
    };

    return (
        <>
            {
                showButtonAddProductCreateList()
                && <Button variant="success"
                           onClick={addProductHandle}>
                    <i className="fas fa-plus pr-1"/>
                    Agregar producto
                </Button>
            }
            {
                showButtonAddProduct()
                && <Link
                    to={`/shopping-list/${shoppingListId}/add-products`}
                    className="btn btn-success btn-block">
                    <i className="fas fa-plus pr-1"/>
                    Agregar producto
                </Link>
            }
        </>
    );
};

export default ShoppingListButtonAddProduct;