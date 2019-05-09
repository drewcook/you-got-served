const {gql} = require("apollo-boost");

export const GET_TABLES = gql`
	query {
		getTables {
			id
			number
		}
	}
`;

export const GET_ITEMS = gql`
	query {
		getItems {
			id
			name
			price
		}
	}
`;

export const GET_CHECKS = gql`
	query {
		getChecks {
			id
			dateCreated
			dateUpdated
			createdBy
			tableId
			closed
			tax
			tip
		}
	}
`;
