import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SidebarProvider } from './contexts/SidebarContext';
import { DataProvider } from './contexts/DataContext';
import LoginPage from './components/views/LoginPage';
import Dashboard from './components/views/Dashboard';

const FloatingShapes: React.FC = () => {
    const shapes = Array.from({ length: 15 }).map((_, i) => {
        const size = Math.random() * 80 + 20; // 20px to 100px
        const style = {
            left: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${Math.random() * 25}s`,
            animationDuration: `${Math.random() * 15 + 10}s`, // 10s to 25s
        };
        return <li key={i} className="shape" style={style}></li>;
    });

    return <ul className="background-shapes">{shapes}</ul>;
};

const AppContent: React.FC = () => {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const blob = document.getElementById('blob');
        if (!blob) return;

        const handlePointerMove = (event: PointerEvent) => {
            const { clientX, clientY } = event;
            blob.animate({
                left: `${clientX}px`,
                top: `${clientY}px`
            }, { duration: 3000, fill: "forwards" });
        };

        window.addEventListener('pointermove', handlePointerMove);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
        };
    }, []);

    return isAuthenticated ? <Dashboard /> : <LoginPage />;
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <DataProvider>
                <SidebarProvider>
                    <div className="min-h-screen text-text-primary font-sans relative">
                        <FloatingShapes />
                        <AppContent />
                    </div>
                </SidebarProvider>
            </DataProvider>
        </AuthProvider>
    );
};

export default App;