import { types } from '../../../src/auth';

describe('Pruebas en "Types"', () => {
	test('debe regresar estos types', () => {
		expect(types).toEqual({
			login: '[Auth] Login',
			logout: '[Auth] Logout',
		});
	});
});
