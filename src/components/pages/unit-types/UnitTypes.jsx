import {useContext, useEffect, useState} from "react";
import Content from "../../common/Content";
import Card from "../../common/Card";
import {LoadingProcessScreenContext, ShowMessagesContext, ConfirmDialogContext} from "../../../App";
import Pagination from "../../common/Pagination";
import UnitTypeForm from "./UnitTypeForm";
import {Link, useParams, useHistory} from "react-router-dom";
import {UnitTypesRC} from "../../../services/UnitTypesRC";
import unitTypesInitState from "../../../assests/responses/unit-types.json";
import BreadCrumbApp from "../../../common/BreadCrumbApp";

const UnitTypes = () => {

    const [unitTypes, setUnitTypes] = useState(unitTypesInitState);

    const [url, setUrl] = useState("");

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    const {unitTypeId} = useParams();

    const showMessage = useContext(ShowMessagesContext);

    const confirmDialog = useContext(ConfirmDialogContext);

    const history = useHistory();

    useEffect(() => {
        initData();
    }, [url]);

    const initData = () => {
        loadingProcessScreen.show();
        UnitTypesRC.get({
            uri: url,
            success: (data) => setUnitTypes(data),
            error: () => showMessage.error({message: "Error al obtener los tipos de unidad"}),
            final: loadingProcessScreen.hide
        });
    };

    const PageHeader = () => (
        <>
            <span>Tipo de unidades de productos</span>
            {unitTypeId && (
                <Link to={UnitTypesRC.getPath()} className="btn btn-success">
                    <i className="fas fa-plus" />
                </Link>
            )}
        </>
    );

    const onPageClick = (url) => {
        loadingProcessScreen.show();
        setUrl(url);
    };

    const onActionSubmit = () => {
        initData();
    };

    const onClickDelete = (id) => {
        loadingProcessScreen.show();
        UnitTypesRC.delete({
            id: id,
            success: () => {
                initData();
                showMessage.success({message: "Tipo de unidad borrada."});
                history.push(UnitTypesRC.getPath());
            },
            error: (data) => {
                if (data && data.error) {
                    showMessage.error(data.error);
                }
            },
            final: loadingProcessScreen.hide
        });
    };

    const deleteConfirmDialog = (id) => {
        confirmDialog.deleted({
            accept: () => {
                onClickDelete(id);
            }
        });
    };

    return (
        <Content pageHeader={<PageHeader />} breadcrumbItems={BreadCrumbApp.unitType()}>
            <UnitTypeForm onActionSubmit={onActionSubmit} />
            <Card>
                <div className="cuadricula mb-3">
                    {unitTypes.data.map((unitType) => {
                        return (
                            <div className="cuadricula-child" key={unitType.name}>
                                <i className="fa fa-tint fa-4x py-2"></i>
                                <div className="cuadricula-data">
                                    <div className="cuadricula-name text-center">
                                        <p className="m-0">{unitType.name}</p>
                                    </div>
                                    <div className="btn-group">
                                        <Link
                                            to={`/unit-types/${unitType.id}`}
                                            className="btn btn-info btn-sm"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            type="button"
                                            onClick={(e) =>
                                                deleteConfirmDialog(unitType.id)
                                            }
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <Pagination
                    links={unitTypes.meta.links}
                    onClick={onPageClick}
                    nameKey="unit-types"
                />
            </Card>
        </Content>
    );
};

export default UnitTypes;
