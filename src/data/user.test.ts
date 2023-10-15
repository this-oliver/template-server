describe("User Data", () => {
	describe("createUser", () => {
		it("should return a user");
		it("should throw an error if username is not provided");
		it("should throw an error if username is not unique");
		it("should throw an error if password is not provided");
		it("should convert plain text password to a hashed password");
		it("should insert salt into the user document");
	});

	describe("getUserById", () => {
		it("should throw an error if id is not provided");
		it("should return a user");
		it("should redact the password and salt by default");
		it("should return the password and salt if requested via config.secrets");
	});

	describe("getUserByUsername", () => {
		it("should throw an error if username is not provided");
		it("should return a user");
		it("should redact the password and salt by default");
		it("should return the password and salt if requested via config.secrets");
	});

	describe("indexUsers", () => {
		it("should return an array of users");
		it("should redact the password and salt by default");
		it("should return the password and salt if requested via config.secrets");
	});

	describe("updateUser", () => {
		it("should throw an error if id is not provided");
		it("should not change properties that are not provided in the update object");
		it("should return a user");
		it("should redact the password and salt by default");
		it("should return the password and salt if requested via config.secrets");
	});

	describe("deleteUser", () => {
		it("should throw an error if id is not provided");
		it("should return a user");
		it("should redact the password and salt by default");
		it("should return the password and salt if requested via config.secrets");
	});
});