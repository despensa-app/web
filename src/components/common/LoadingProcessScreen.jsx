import {ProgressSpinner} from 'primereact/progressspinner';
import clsx from "clsx";

const LoadingProcessScreen = ({isLoading = false}) => (
    <div id="loading-process-screen" className={clsx("full-screen", {"d-block": isLoading}, {"d-none": !isLoading})}>
        <div className="full-screen-container">
            <ProgressSpinner/>
        </div>
        <div className="full-screen-background"/>
    </div>
);

export default LoadingProcessScreen