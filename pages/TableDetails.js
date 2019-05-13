import Layout from "../client/components/Layout";
import CheckCard from "../client/components/CheckCard";
import { Mutation, Query } from "react-apollo";
import { ADD_CHECK } from "../mutations";
import { GET_TABLE_BY_ID, GET_CHECKS_FOR_TABLE } from "../queries";
import LoadingModule from "../client/components/LoadingModule";
import Link from "next/link";
import TableNumber from "../client/components/TableNumber";

{/* I'd prefer to combine multiple queries into a singular one that only needs to be called once, and that will return a singular object containing table details and all checks associated with it */}
const TableDetails = props => (
	<Layout title="Table Details">
		<Link href="/Tables" as="/tables"><button className="btn btn-secondary"><i className="fas fa-angle-left"></i> Back To Tables</button></Link>
		<h2>Table Details</h2>
		<hr className="border-warning" />
		<Query query={GET_TABLE_BY_ID} variables={{id: props.router.query.id}}>
			{({data: {getTableById}, loading, error}) => {
				if (loading) return <LoadingModule />;
				if (error) return (<div className="text-danger">{error.message}</div>);
				const table = getTableById;
				return (
					<div>
						<h5>Number: <TableNumber number={table.number} /></h5>
						{/*<h5>ID: <em>{table.id}</em></h5> not needed for a user */}
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
										return getChecksByTable.map((check, idx) => <CheckCard key={idx} check={check} />);
									}}
								</Query>
							</div>
							<div className="col-xs-12 col-md-6">
								<h4>Closed Checks</h4>
								<hr className="border-primary"/>
							</div>
						</div>
					</div>
				);
			}}
		</Query>
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
