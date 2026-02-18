import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export default function RootLayout() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-primary-500/30">
            {/* Background elements would go here */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black -z-10" />

            <Navbar />

            <main>
                <Outlet />
            </main>
        </div>
    );
}
