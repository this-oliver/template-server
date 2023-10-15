describe('Crypto Util', () => {
	describe('setToken()', () => {
		it('should return a string');
		it('token should expire in 24 hours by default');
		it('token should expire in 1 hour if expiresIn is set to 1h');
	});

	describe('getToken()', () => {
		it('should return a string if token is valid');
		it('should return null if token is invalid');
	});

	describe('hashPassword()', () => {
		it('should return a string');
		it('should return a different string for the same input');
	});

	describe('comparePasswords()', () => {
		it('should return true if password matches hash');
		it('should return false if password does not match hash');
	});
});