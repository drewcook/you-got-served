import Layout from "../client/components/Layout";
import { Query } from "react-apollo";
import { GET_CHECK_DETAILS } from "../queries";
import LoadingModule from "../client/components/LoadingModule";
import moment from "moment";
import Link from "next/link";

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
						<p className="lead">Status: {details.closed ? <span className="badge badge-danger">Closed</span> : <span className="badge badge-success">Open</span>}</p>
						<p>Check ID: {details.id}</p>
						<p>Table ID: {details.tableId}</p>
						<p className="text-muted">Opened on {moment(details.dateCreated).format("MM/DD/YYYY @ h:mm A")}</p>
						<p className="text-muted">Last Modified on {moment(details.dateUpdated).format("MM/DD/YYYY @ h:mm A")}</p>
						<hr className="border-dark" />
						<h4 className="d-flex justify-content-between align-content-center">Items <button className="btn btn-sm btn-info"><i className="fas fa-plus"></i> Add Item</button></h4>
						{details.length ? details.orderedItems.map((item, idx) => (
							<div>
								{item.id}
							</div>
						)) : <p>There are currently no items on this check.</p>}
						<p>Tax: {details.tax ? details.tax : "N/A"}</p>
						<p>Tip: {details.tip ? details.tip : "N/A"}</p>
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
			h4 {
				margin-bottom: 30px;
			}
		`}</style>
	</Layout>
);

export default CheckDetails;
