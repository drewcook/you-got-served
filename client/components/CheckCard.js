import moment from "moment";
import Link from "next/link";

const CheckCard = ({check}) => (
	<div className="card border-secondary mb-3">
		<div className="card-header d-flex justify-content-between align-content-center">Check Details {check.closed ? <span className="badge badge-danger">Closed</span> : <span className="badge badge-success">Open</span>}</div>
		<div className="card-body">
			<p className="card-text text-muted"><em>Opened on {moment(check.dateCreated).format("MM/DD/YYYY @ h:mm A")}</em></p>
			<p className="card-text">Table: {check.tableId}</p>
			<div className="text-right">
				<Link href={`/CheckDetails/${check.id}`} as={`/check/${check.id}`}><button className="btn btn-sm btn-outline-warning mr-2"><i className="fas fa-info-circle"></i> Details</button></Link>
			</div>
		</div>
		<style jsx>{`
		
	`}</style>
	</div>
);

export default CheckCard;
