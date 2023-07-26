import Header from '../components/UI/Header';
import { Outlet } from "react-router-dom";
import { UiContextProvider } from '../store/ui-context';

function RootLayout() {
    return (
        <UiContextProvider>
            <Header />
            <main className="main">
                <Outlet />
            </main>
        </UiContextProvider>
    );
}

export default RootLayout;
