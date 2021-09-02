import {Link} from "react-router-dom";

const ShoppingListButtonCreate = () => {
    return (
        <Link to="/shopping-list/form" className="btn btn-success">
            <i className="fas fa-plus pr-1"/>
            <span>Nuevo</span>
        </Link>
    );
};

export default ShoppingListButtonCreate;