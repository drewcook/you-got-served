const {gql} = require("apollo-boost");

export const GET_TABLES = gql`
	query {
		getTables {
			id
			number
		}
	}
`;

export const GET_TABLE_BY_ID = gql`
	query($id: String!) {
		getTableById(id: $id) {
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

export const GET_CHECKS_FOR_TABLE = gql`
	query($tableId: String!) {
		getChecksByTable(tableId: $tableId) {
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

export const GET_CHECK_DETAILS = gql`
	query($checkId: String!) {
		getCheckDetails(checkId: $checkId) {
			id
			dateCreated
			dateUpdated
			createdBy
			tableId
			closed
			tax
			tip
			orderedItems {
				id
				name
				price
				dateCreated
				dateUpdated
				createdBy
				checkId
				itemId
				voided
			}
		}
	}
`;
