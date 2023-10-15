describe("Todo Data", () => {
	describe("createTodo", () => {
		it("should return a todo");
		it("should throw an error if title is not provided");
		it("should throw an error if author is not provided");
	});

	describe("getTodo", () => {
		it("should throw an error if id is not provided");
		it("should return a todo");
	});

	describe("indexTodos", () => {
		it("should return an array of todos");
	});

	describe("indexTodosByAuthor", () => {
		it("should throw an error if author is not provided");
		it("should return an array of todos");
	});

	describe("updateTodo", () => {
		it("should throw an error if id is not provided");
		it("should not change properties that are not provided in the update object");
		it("should return a todo");
	});

	describe("deleteTodo", () => {
		it("should throw an error if id is not provided");
		it("should return a todo");
	});
});