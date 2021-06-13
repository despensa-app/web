import {useContext, useEffect, useState} from "react";
import Content from "../common/Content";
import Card from "../common/Card";
import {LoadingProcessScreenContext, ShowMessagesContext, ConfirmDialogContext} from "../../App";
import Pagination from "../common/Pagination";
import UnitTypeForm from "./UnitTypeForm";
import {Link, useParams} from "react-router-dom";
import {UnitTypesRC} from "../rest-call/UnitTypesRC";
import unitTypeResponse from "../../assests/unit-type.json";

const UnitTypes = () => {

    const breadcrumbItems = {
        home: {
            preIconClassName: 'fas fa-home',
            url: '/'
        },
        items:
            [
                {
                    label: 'Tipo de unidades',
                    active: true
                }
            ]
    };

    const [unitTypes, setUnitTypes] = useState(unitTypeResponse);

    const [url, setUrl] = useState("");

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    const {unitTypeId} = useParams();

    const showMessage = useContext(ShowMessagesContext);

    const confirmDialog = useContext(ConfirmDialogContext);

    useEffect(() => {
        initData();
    }, [url]);

    const initData = () => {
        loadingProcessScreen.show();
        UnitTypesRC.get({
            uri: url,
            success: (data) => setUnitTypes(data),
            error: () => showMessage.error({message: "Error al obtener los tipos de unidad"}),
            final: () => loadingProcessScreen.hide()
        });
    };

    const PageHeader = () => (
        <>
            <span>Tipo de unidades de productos</span>
            {unitTypeId && <Link to="/unit-types" className="btn btn-success">
                <i className="fas fa-plus"/>
            </Link>}
        </>
    );

    const onPageClick = (url) => {
        loadingProcessScreen.show();
        setUrl(url);
    };

    const onActionSubmit = () => {
        initData();
    }

    const onClickDelete = (id) => {
        loadingProcessScreen.show();
        UnitTypesRC.delete({
            id: id,
            success: () => {
                initData();
                showMessage.success({message: "Tipo de unidad borrada."});
            },
            error: (data) => {
                loadingProcessScreen.hide();
                if (data && data.error) {
                    showMessage.error(data.error);
                }
            }
        });
    }

    const deleteConfirmDialog = (id) => {
        confirmDialog.deleted({
            accept: () => {
                onClickDelete(id);
            }
        });
    }

    return (
        <Content pageHeader={<PageHeader/>} breadcrumbItems={breadcrumbItems}>
            <UnitTypeForm onActionSubmit={onActionSubmit}/>
            <Card className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th/>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            unitTypes.data.map((unitType, i) => (
                                <tr key={`unit-type-${i}`}>
                                    <td className="w-25 td-btn-actions">
                                        <div className="btn-group">
                                            <Link
                                                to={`/unit-types/${unitType.id}`}
                                                className="btn btn-primary btn-sm"
                                                href="/">
                                                <i className="fas fa-edit"/>
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={(e) => deleteConfirmDialog(unitType.id)}>
                                                <i className="far fa-trash-alt"/>
                                            </button>
                                        </div>
                                    </td>
                                    <td>{unitType.name}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Pagination
                    links={unitTypes.meta.links}
                    onClick={onPageClick}
                    nameKey="unit-types"/>
            </Card>
        </Content>
    );
};

export default UnitTypes;