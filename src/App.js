import {lazy, Suspense} from "react";
import $ from "admin-lte/plugins/jquery/jquery.min";

window.$ = $;
window.jQuery = $;
const Index = lazy(() => import("./components/Index"));

const App = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Index/>
    </Suspense>
);

export default App;