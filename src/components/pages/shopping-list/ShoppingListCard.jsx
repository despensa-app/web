import {Link} from "react-router-dom";

const ShoppingListCard = ({
    id,
    name,
    total_calories,
    total_price,
    onClickDelete
}) => {
    return (
        <div className="card bg-light flex-fill">
            <div className="card-header text-muted border-bottom-0">
                <h2 className="card-title">{name}</h2>
            </div>
            <div className="card-body pt-0">
                <ul className="ml-4 mb-0 fa-ul text-muted">
                    <li>
                        <span className="fa-li"><i className="fas fa-shopping-bag"/></span>
                        {}
                    </li>
                    <li>
                        <span className="fa-li"><i className="fas fa-lg fa-euro-sign"/></span>
                        {total_price} €
                    </li>
                    <li>
                        <span className="fa-li"><i className="fas fa-lg fa-burn"/></span>
                        {total_calories} kcal
                    </li>
                </ul>
            </div>
            <div className="card-footer">
                <div className="row">
                    <div className="col-3">
                        <button className="btn btn-sm btn-danger"
                                onClick={(e) => onClickDelete(id)}>
                            <i className="fas fa-trash"/>
                        </button>
                    </div>
                    <div className="col-9 text-right">
                        <Link to={`/shopping-list/${id}`} className="btn btn-sm btn-primary">
                            Ver lista
                        </Link>
                        <a href="#" className="btn btn-sm btn-default">
                            <i className="fas fa-plus"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingListCard;