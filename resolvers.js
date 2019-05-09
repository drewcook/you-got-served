const fetch = require("isomorphic-unfetch");

const apiPath = endpoint => `https://check-api.herokuapp.com/${endpoint}`;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0YmFjMjhjLWJiNzItNGY1MC05ZTBiLTkyODNkODRlMThhNCIsIm5hbWUiOiJEcmV3In0.QcyDtRfPBuIlDiUgUznIuOb4RGXp__JYXETzbm8Nalo";

const request = async (endpoint, type) => {
	const req = await fetch(apiPath(endpoint), {
		method: type,
		headers: {
			"authorization": token,
			"Content-Type": "application/json"
		}
	});
	const response = await req.json();
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
		}
	}
};
