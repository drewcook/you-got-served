import Layout from "../client/components/Layout";

const TableDetails = props => (
	<Layout title="Table Details">
		<button className="btn btn-secondary"><i className="fas fa-angle-left"></i> Back To Tables</button>
		<h2>Table Details</h2>
		<hr className="border-warning" />
		<h5><em>Table ID: {props.router.query.id}</em></h5>
		<button className="btn btn-info"><i className="fas fa-plus"></i> Add Check</button>
		<div className="row">
			<div className="col-xs-12 col-md-6">
				<h4>Open Checks</h4>
				<hr className="border-primary"/>
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
