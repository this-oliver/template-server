import { NODE_ENV, PORT, DATABASE_URL, ALLOWED_ORIGINS } from "./config/env";
import app from "./app";
import database from "./database";

database.connect()
	.catch((error) => {
		console.error(error);
		return;
	});

app.listen(PORT, function () {
	console.log(`\nExpress server listening on port ${PORT} in ${NODE_ENV} mode`);
	console.log(`Server: http://localhost:${PORT}/api/`);
	console.log(`Database: ${DATABASE_URL}\n`);
	console.log(`Allowd origins: ${ALLOWED_ORIGINS}\n`);
});
