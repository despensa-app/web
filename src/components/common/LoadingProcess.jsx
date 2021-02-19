import {ProgressSpinner} from 'primereact/progressspinner';
import clsx from "clsx";

const LoadingProcess = ({display = false}) => (
    <div id="loading-process-screen" className={clsx("full-screen", {"d-block": display}, {"d-none": !display})}>
        <div className="full-screen-container">
            <ProgressSpinner/>
        </div>
        <div className="full-screen-background"/>
    </div>
);

export default LoadingProcess