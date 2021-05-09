const fetch = require("isomorphic-unfetch");

// It would be an improvement to the API documentation to specify what each endpoint returns
const apiPath = (endpoint) => `https://check-api.herokuapp.com/${endpoint}`;

const request = async (endpoint, type, options = null) => {
	let opts;
	if (options) {
		opts = {
			method: type,
			headers: {
				Authorization:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0YmFjMjhjLWJiNzItNGY1MC05ZTBiLTkyODNkODRlMThhNCIsIm5hbWUiOiJEcmV3In0.QcyDtRfPBuIlDiUgUznIuOb4RGXp__JYXETzbm8Nalo",
			},
			body: JSON.stringify(options),
		};
	} else {
		opts = {
			method: type,
			headers: {
				Authorization:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0YmFjMjhjLWJiNzItNGY1MC05ZTBiLTkyODNkODRlMThhNCIsIm5hbWUiOiJEcmV3In0.QcyDtRfPBuIlDiUgUznIuOb4RGXp__JYXETzbm8Nalo",
			},
		};
	}

	let req = await fetch(apiPath(endpoint), opts);
	let response = await req.json();
	return response;
};

exports.resolvers = {
	Query: {
		getTables: async (root, args, { Table }) => {
			return await request("tables", "GET");
		},
		getTableById: async (root, { id }, { Table }) => {
			const tables = await request("tables", "GET");
			return tables.filter((table) => table.id === id)[0];
		},
		getItems: async (root, args, { Item }) => {
			return await request("items", "GET");
		},
		getChecks: async (root, args, { Check }) => {
			return await request("checks", "GET");
		},
		getChecksByTable: async (root, { tableId }, { Table, Check }) => {
			const checks = await request("checks", "GET");
			return checks.filter((check) => check.tableId === tableId);
		},
		getCheckDetails: async (root, { checkId }, { Check }) => {
			const details = await request(`checks/${checkId}`, "GET");
			const items = await request("items", "GET");
			// attach names and prices to ordered items
			items.map((item) => {
				details.orderedItems.map((orderedItem) => {
					if (orderedItem.itemId === item.id) {
						orderedItem.name = item.name;
						orderedItem.price = item.price;
						return false;
					}
				});
			});
			return details;
		},
	},
	Mutation: {
		addCheck: async (root, { tableId }, { Table }) => {
			return await request("checks", "POST", { tableId });
		},
		closeCheck: async (root, { checkId }, { Check }) => {
			return await request(`checks/${checkId}/close`, "PUT");
		},
		addNewItem: async (root, { checkId, itemId }, { Check }) => {
			return await request(`checks/${checkId}/addItem`, "PUT", { itemId })
				.then(() => true)
				.catch((ex) => {
					throw new Error(ex);
					return false;
				});
		},
		voidItem: async (root, { checkId, itemId }) => {
			return await request(`checks/${checkId}/voidItem`, "PUT", {
				orderedItemId: itemId,
			});
		},
		deleteAllChecks: async (root, args, { Check }) => {
			return await request("checks", "DELETE");
		},
	},
};
