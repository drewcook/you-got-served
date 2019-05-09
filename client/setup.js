const ApolloBoost = require("apollo-boost");
const ApolloClient = ApolloBoost.default;
const fetch = require("isomorphic-unfetch");

const client = new ApolloClient({
	uri: "http://localhost:3000/graphql",
	fetchOptions: {
		credentials: "include"
	},
	request: operation => {
		const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0YmFjMjhjLWJiNzItNGY1MC05ZTBiLTkyODNkODRlMThhNCIsIm5hbWUiOiJEcmV3In0.QcyDtRfPBuIlDiUgUznIuOb4RGXp__JYXETzbm8Nalo";
		operation.setContext({
			headers: {
				"Authorization": token
			}
		})
	},
	onError: ({ networkError }) => {
		if (networkError) console.log("Network Error -", networkError);
	}
});

export default client;
