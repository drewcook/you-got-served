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

export const CLOSE_CHECK = gql`
	mutation($checkId: String!) {
		closeCheck(checkId: $checkId) {
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

export const ADD_ITEM = gql`
	mutation($checkId: String!, $itemId: String!) {
		addNewItem(checkId: $checkId, itemId: $itemId)
	}
`;

export const VOID_ITEM = gql`
	mutation($checkId: String!, $itemId: String!) {
		voidItem(checkId: $checkId, itemId: $itemId) {
			id
			dateCreated
			dateUpdated
			createdBy
			checkId
			itemId
			voided
		}
	}
`;
