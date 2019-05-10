const {gql} = require("apollo-boost");

export const ADD_CHECK = gql`
	mutation($tableId: String!) {
		addCheck(tableId: $tableId) {
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
