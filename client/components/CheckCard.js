import moment from "moment";
import Link from "next/link";
import { Query } from "react-apollo";
import { GET_TABLE_BY_ID } from "../../queries";
import LoadingModule from "./LoadingModule";
import TableNumber from "./TableNumber";

const CheckCard = ({ check }) => (
	<div className="card border-secondary mb-3">
		<div className="card-header d-flex justify-content-between align-content-center">
			Check Details{" "}
			{check.closed ? (
				<span className="badge badge-danger">Closed</span>
			) : (
				<span className="badge badge-success">Open</span>
			)}
		</div>
		<div className="card-body">
			<p className="card-text text-muted">
				<em>
					Opened on {moment(check.dateCreated).format("MM/DD/YYYY @ h:mm A")}
				</em>
			</p>
			{/* I would normally not want to have any queries/mutations on components, and prefer to do that at the page level */}
			{/* Since I need table number here at this level, it's probably best to just create a new schema and combine two requests within one GQL query to combine the data into a singular object */}
			<Query query={GET_TABLE_BY_ID} variables={{ id: check.tableId }}>
				{({ data: { getTableById }, loading, error }) => {
					if (loading) return <LoadingModule />;
					if (error) return <div className="text-danger">{error.message}</div>;
					return (
						<p className="card-text">
							Table: <TableNumber number={getTableById.number} />
						</p>
					);
				}}
			</Query>
			<div className="text-right">
				<Link href={`/check/${check.id}`} as={`/check/${check.id}`}>
					<button className="btn btn-sm btn-outline-warning mr-2">
						Details <i className="fas fa-info-circle"></i>
					</button>
				</Link>
			</div>
		</div>
		<style jsx>{`
			.btn {
				text-transform: uppercase;
			}
		`}</style>
	</div>
);

export default CheckCard;
