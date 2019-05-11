const fetch = require("isomorphic-unfetch");

const apiPath = endpoint => `https://check-api.herokuapp.com/${endpoint}`;

const request = async (endpoint, type, options = null) => {
	let opts;
	if (options) {
		opts = {
			method: type,
			headers: {
				"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0YmFjMjhjLWJiNzItNGY1MC05ZTBiLTkyODNkODRlMThhNCIsIm5hbWUiOiJEcmV3In0.QcyDtRfPBuIlDiUgUznIuOb4RGXp__JYXETzbm8Nalo",
			},
			body: JSON.stringify(options)
		};
	} else {
		opts = {
			method: type,
			headers: {
				"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0YmFjMjhjLWJiNzItNGY1MC05ZTBiLTkyODNkODRlMThhNCIsIm5hbWUiOiJEcmV3In0.QcyDtRfPBuIlDiUgUznIuOb4RGXp__JYXETzbm8Nalo",
			}
		};
	}

	let req = await fetch(apiPath(endpoint), opts);
	let response = await req.json();
	return response;
}

exports.resolvers = {
	Query: {
		getTables: async (root, args, {Table}) => {
			return await request("tables", "GET");
		},
		getItems: async (root, args, {Item}) => {
			return await request("items", "GET");

		},
		getChecks: async (root, args, {Check}) => {
			return await request("checks", "GET");
		},
		getChecksByTable: async (root, {tableId}, {Table, Check}) => {
			const checks = await request("checks", "GET");
			return checks.filter(check => check.tableId === tableId);
		},
		getCheckDetails: async (root, {checkId}, {Check}) => {
			return await request(`checks/${checkId}`, "GET");
		}
	},
	Mutation: {
		addCheck: async (root, {tableId}, {Table}) => {
			return await (request("checks", "POST", {tableId}));
		}
	}
};
