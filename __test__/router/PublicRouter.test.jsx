import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/router/PublicRoute";

describe('Pruebas en <PublicRoute />', () => {
    test('debe mostrar el children si no está autenticado', () => {

        const contextValue = {
            logged: false
        };

        render(
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Public Route</h1> {/* Esto es un children */}
                </PublicRoute>
            </AuthContext.Provider>
        );

        // screen.debug();

        expect( screen.getByText('Public Route') ).toBeTruthy();
    });

    test('debe "navegar" si está autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                id: 'asd',
                name: 'Andy'
            },
        };

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>

                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Public Route</h1> {/* Esto es un children */}
                            </PublicRoute>
                        } />

                        <Route path="marvel" element={ <h1>Marvel Page</h1> } />

                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // screen.debug();

        expect( screen.getByText('Marvel Page') ).toBeTruthy();
    });
});