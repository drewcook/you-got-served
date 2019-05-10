import Layout from "../client/components/Layout";
import { Mutation, Query } from "react-apollo";
import { ADD_CHECK } from "../mutations";
import { GET_CHECKS_FOR_TABLE } from "../queries";
import LoadingModule from "../client/components/LoadingModule";

const TableDetails = props => (
	<Layout title="Table Details">
		<button className="btn btn-secondary"><i className="fas fa-angle-left"></i> Back To Tables</button>
		<h2>Table Details</h2>
		<hr className="border-warning" />
		<h5><em>Table ID: {props.router.query.id}</em></h5>
		<Mutation mutation={ADD_CHECK} variables={{tableId: props.router.query.id}} refetchQueries={[{query: GET_CHECKS_FOR_TABLE, variables: {tableId: props.router.query.id}}]}>
			{(addCheck, {loading, error}) => {
				return (
					<div>
						{/* TODO: update API error message for if there's an open check already */}
						<button className="btn btn-info" onClick={addCheck} disabled={loading}><i className="fas fa-plus"></i> Add Check</button>
						{error && <p className="text-danger"><small>You may not add another check if one is already open.</small></p>}
					</div>
				);
			}}
		</Mutation>
		<div className="row">
			<div className="col-xs-12 col-md-6">
				<h4>Open Checks</h4>
				<hr className="border-primary"/>
				<Query query={GET_CHECKS_FOR_TABLE} variables={{tableId: props.router.query.id}}>
					{({data: {getChecksByTable}, loading, error}) => {
						if (loading) return <LoadingModule />;
						if (error) return <div className="text-danger">{error.message}</div>;
						return getChecksByTable.map(check => (
							<div key={check.id}>{check.id}</div>
						));
					}}
				</Query>
			</div>
			<div className="col-xs-12 col-md-6">
				<h4>Closed Checks</h4>
				<hr className="border-primary"/>
			</div>
		</div>
		<style jsx>{`
			.btn-secondary {
				margin: -50px 0 10px;
			}
			h3 {
				margin-bottom: 20px;
			}
			.row {
				margin-top: 40px;
			}
			.btn-info {
				margin: 15px 0;
			}
		`}</style>
	</Layout>
);

export default TableDetails;
