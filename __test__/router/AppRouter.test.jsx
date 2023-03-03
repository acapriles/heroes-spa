import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/router/AppRouter";

describe('Pruebas en <AppRouter />', () => {
    test('debe mostrar el Login si no está autenticado', () => {
        const contextValue = {
            legged: false,
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getByRole('heading', {level: 1}).innerHTML ).toBe('Login');
        expect( screen.getAllByText('Login').length ).toBe( 2 );
    });

    test('debe mostrar el componente de Marvel si está autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                id: '123',
                name: 'Andy'
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getAllByText('Marvel').length ).toBeGreaterThanOrEqual(1);
    });

});