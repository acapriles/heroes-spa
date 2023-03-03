import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";

describe('Pruebas en <PrivateRoute />', () => { 
    test('debe mostrar el children si está autenticado', () => {

        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: 'asd',
                name: 'Andy'
            },
        };

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/marvel?q=batman']}>
                    <PrivateRoute>
                        <h1>Private Route</h1> {/* Esto es un children */}
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // screen.debug();

        expect( screen.getByText('Private Route') ).toBeTruthy();
        // Verifica la funcionalidad del localstorage
        expect( localStorage.setItem ).toHaveBeenCalled();
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel?q=batman');
    });
});