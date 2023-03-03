import { authReducer, types } from '../../../src/auth';

describe('Pruebas en authReducer()', () => {
	test('debe retornar el estado por defecto', () => {
		const newState = authReducer({ logged: false }, {});
		expect(newState).toEqual({ logged: false });
	});

	test('debe hacer login y autenticar el user', () => {
		const action = {
			type: types.login,
			payload: {
				id: '1',
				name: 'Anderson Capriles',
			},
		};

		const state = authReducer({ logged: false }, action);

		expect(state.logged).toBeTruthy();
		expect(state).toEqual({
			logged: true,
			user: action.payload,
		});
	});

	test('debe hacer logout y borrar el name del user', () => {
		const state = {
			logged: true,
			user: {
				id: '1',
				name: 'Anderson Capriles',
			},
		};

		const action = { type: types.logout };

		const newState = authReducer(state, action);

		expect(newState.logged).toBeFalsy();
		expect(newState).toEqual({ logged: false });
	});
});
