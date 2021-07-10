import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Card from "../common/Card";
import {LoadingProcessScreenContext, ShowMessagesContext} from "../../App";
import {UnitTypesRC} from "../rest-call/UnitTypesRC";

const UnitTypeForm = ({onActionSubmit}) => {

    const [unitTypeName, setUnitTypeName] = useState('');

    const loadingProcessScreen = useContext(LoadingProcessScreenContext);

    const {unitTypeId} = useParams();

    const showMessage = useContext(ShowMessagesContext);

    useEffect(() => {
        setUnitTypeName('');

        if (!unitTypeId) {
            return;
        }

        loadingProcessScreen.show();
        UnitTypesRC.get({
            id: unitTypeId,
            success: (data) => {
                setUnitTypeName(data.data.name);
            },
            final: loadingProcessScreen.hide
        });
    }, [unitTypeId]);

    const onSubmit = (e) => {
        e.preventDefault();
        loadingProcessScreen.show();

        if (unitTypeId) {
            update();
        } else {
            create();
        }
    };

    const create = () => {
        UnitTypesRC.post({
            body: {name: unitTypeName},
            success: () => {
                showMessage.success({message: "Tipo de unidad creada."});
            },
            error: (data) => showMessage.error(data.error),
            final: () => {
                onActionSubmit();
                setUnitTypeName("");
            }
        });
    }

    const update = () => {
        UnitTypesRC.put({
            body: {name: unitTypeName},
            id: unitTypeId,
            success: () => {
                showMessage.success({message: "Tipo de unidad actualizada."})
            },
            error: (data) => showMessage.error(data.error),
            final: onActionSubmit
        });
    }

    return (
        <Card>
            <form className="row" onSubmit={onSubmit}>
                <div className="col-sm-10">
                    <div className="row">
                        <label htmlFor="unit_type_name" className="col-sm-2 col-form-label">Nombre</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                id="unit_type_name"
                                className="form-control"
                                value={unitTypeName}
                                onChange={(e) => setUnitTypeName(e.target.value)}/>
                        </div>
                    </div>
                    <br className="d-block d-sm-none"/>
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-primary btn-block">
                        {unitTypeId ? 'Modificar' : 'Crear'}
                    </button>
                </div>
            </form>
        </Card>
    );
};

export default UnitTypeForm