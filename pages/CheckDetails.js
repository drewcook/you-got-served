import Layout from "../client/components/Layout";
import { Query } from "react-apollo";
import { GET_CHECK_DETAILS, GET_TABLE_BY_ID} from "../queries";
import LoadingModule from "../client/components/LoadingModule";
import moment from "moment";
import Link from "next/link";
import TableNumber from "../client/components/TableNumber";

const CheckDetails = props => (
	<Layout title="Check Details">
		<h2>Check Details</h2>
		<hr className="border-warning" />
		<Query query={GET_CHECK_DETAILS} variables={{checkId: props.router.query.id}}>
			{({data: {getCheckDetails}, loading, error}) => {
				if (loading) return <LoadingModule />;
				if (error) return (<div className="text-danger">{error.message}</div>);
				const details = getCheckDetails;
				console.log(details);
				return (
					<div>
						<Link href={`/table?id=${details.tableId}`} as={`/table/${details.tableId}`}><button className="btn btn-secondary"><i className="fas fa-angle-left"></i> Table Details</button></Link>
						{/*<p>Check ID: {details.id}</p> not needed for a user */}
						<Query query={GET_TABLE_BY_ID} variables={{id: details.tableId}}>
							{({data: {getTableById}, loading, error}) => {
								if (loading) return <LoadingModule />;
								if (error) return (<div className="text-danger">{error.message}</div>);
								return (
									<p className="lead">Table: <TableNumber number={getTableById.number} /></p>
								);
							}}
						</Query>
						<p className="lead">Status: {details.closed ? <span className="badge badge-danger">Closed</span> : <span className="badge badge-success">Open</span>}</p>
						<p className="text-muted">Opened on {moment(details.dateCreated).format("MM/DD/YYYY @ h:mm A")}</p>
						<p className="text-muted">Last Modified on {moment(details.dateUpdated).format("MM/DD/YYYY @ h:mm A")}</p>
						<hr className="border-dark" />
						<div className="items-wrapper">
							<h4 className="d-flex align-content-center justify-content-between">Line Items <button className="btn btn-sm btn-info" data-toggle="modal" data-target="#addItemModal"><i className="fas fa-plus"></i> Add Item</button></h4>
							<hr/>
							{details.length ? details.orderedItems.map((item, idx) => (
								<div>
									{item.id}
								</div>
							)) : <p className="text-center"><em>There are currently no items on this check.</em></p>}
							<hr/>
							<p className="line-item">Tax : <span>{details.tax ? details.tax : "N/A"}</span></p>
							<p className="line-item">Tip : <span>{details.tip ? details.tip : "N/A"}</span></p>
						</div>
						<div className="modal fade" role="dialog" id="addItemModal">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title">Modal title</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<p>Modal body text goes here.</p>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-primary">Save changes</button>
										<button type="button" className="btn btn-secondary" data-dismiss="modal">Close
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			}}
		</Query>
		<style jsx>{`
			p.lead {
				margin-top: 20px;
			}
			.badge {
				font-size: 16px;
				margin: 10px 0 20px;
			}
			h4 .btn {
				margin-left: 8px;
				vertical-align: text-top;
			}
			.items-wrapper {
				background: #ccc;
				color: #222;
				padding: 20px 15px;
			}
			.items-wrapper p {
				margin: 0;
			}
			.line-item {
				padding: 4px 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.line-item span {
				font-style: italic;
				font-size: 0.9em
			}
		`}</style>
	</Layout>
);

export default CheckDetails;
