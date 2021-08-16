const ShoppingListCard = ({
    id,
    name,
    total_calories,
    total_price
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
                        <a href="#" className="btn btn-sm btn-danger">
                            <i className="fas fa-trash"/>
                        </a>
                    </div>
                    <div className="col-9 text-right">
                        <a href="#" className="btn btn-sm btn-primary">
                            Ver lista
                        </a>
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