const express = require("express");
const next = require("next");
//const path = require("path");

const cors = require("cors");
const compression = require("compression");

const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();

// setup apollo/graphql server
const {ApolloServer} = require("apollo-server-express");
const {typeDefs} = require("./schema");
const {resolvers} = require("./resolvers");
const aplServer = new ApolloServer({
	typeDefs,
	resolvers,
	playground: dev,
	debug: dev,
	introspection: true
});

// init app
const PORT = process.env.PORT || 3000;
app
	.prepare()
	.then(() => {
		const server = express();

		// app server middleware
		server.use(cors({
			origin: "http://localhost:3000",
			credentials: true
		}));
		if (!dev) server.use(compression);

		// apollo server middleware
		aplServer.applyMiddleware({app: server});
		if (dev) console.log(`GraphQL playground is available at ${aplServer.graphqlPath}`);

		// route handlers
		server.get("/tables", (req, res) => {
			const actualPage = "/Tables";
			const queryParams = {};
			app.render(req, res, actualPage, queryParams);
		});
		server.get("/table/:id", (req, res) => {
			const actualPage = "/TableDetails";
			const queryParams = { id: req.params.id };
			app.render(req, res, actualPage, queryParams);
		});
		server.get("/items", (req, res) => {
			const actualPage = "/Items";
			const queryParams = {};
			app.render(req, res, actualPage, queryParams);
		});
		server.get("/checks", (req, res) => {
			const actualPage = "/Checks";
			const queryParams = {};
			app.render(req, res, actualPage, queryParams);
		});
		server.get("/check/:id", (req, res) => {
			const actualPage = "/CheckDetails";
			const queryParams = { id: req.params.id };
			app.render(req, res, actualPage, queryParams);
		});

		server.get("*", (req, res) => {
			return handle(req, res);
		});

		// open port
		server.listen(PORT, err => {
			if (err) throw err;
			console.log(`App is listening on port: ${PORT}`);
		});
	})
	.catch(ex => {
		console.log(ex.stack);
		process.exit(1);
	});
