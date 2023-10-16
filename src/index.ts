import { NODE_ENV, PORT } from "./config/env";
import app from "./app";

app.listen(PORT, function () {
	console.log(`\nExpress server listening on port ${PORT} in ${NODE_ENV} mode`);
	console.log(`Server: http://localhost:${PORT}/api/`);
});

export default app;
