import Home from "./components/Home";
import ProviderClient from "./components/ProviderClient";
import GoodsServices from "./components/GoodsServices";
import InvoiceGenerator from "./components/InvoiceGenerator";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/fetch-data',
        element: <InvoiceGenerator />
    },
    {
        path: '/provider-client',
        element: <ProviderClient />
    },
    {
        path: '/goods-services',
        element: <GoodsServices />
    }
];

export default AppRoutes;
