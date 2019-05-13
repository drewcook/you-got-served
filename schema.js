const {gql} = require("apollo-server-express");

exports.typeDefs = gql`
	type Query {
		getTables: [Table]
		getTableById(id: String!): Table
		getItems: [Item]
		getChecks: [Check]
		getChecksByTable(tableId: String!): [Check]
		getCheckDetails(checkId: String!): Check
	}
	
	type Mutation {
		addCheck(tableId: String!): Check
		addNewItem(checkId: String!, itemId: String!): Boolean
	}
	
	type Table {
		id: String!
		number: Int!
	}
	
	type Item {
		id: String!
		name: String!
		price: Float!
	}
	
	type Check {
		id: String!
		dateCreated: String
		dateUpdated: String
		createdBy: String
		tableId: String!
		closed: Boolean
		tax: Int
		tip: Float
		orderedItems: [OrderedItem]
	}
	
	type OrderedItem {
		id: String!
		name: String
		price: Float
		dateCreated: String
		dateUpdated: String
		createdBy: String
		checkId: String!
		itemId: String!
		voided: Boolean
	}
`;
