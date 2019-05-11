import Layout from "../client/components/Layout";
import { GET_CHECKS } from "../queries";
import { Query } from "react-apollo";
import LoadingModule from "../client/components/LoadingModule";
import CheckCard from "../client/components/CheckCard";

const Checks = props => (
	<Layout title="Checks">
		<h2>Checks</h2>
		<hr className="border-warning" />
		<Query query={GET_CHECKS}>
			{({data: {getChecks}, loading, error}) => {
				if (loading) return <LoadingModule />
				if (error) return <div className="text-danger">{error.message}</div>;
				return getChecks.length ?
					<div className="row">
						{getChecks.map((check, idx) => (
							<div className="col-xs-12 col-sm-6 col-lg-4" key={idx}>
								<CheckCard check={check} />
							</div>
						))}
					</div> :
					<p className="text-center lead">There are currently no checks.</p>;
			}}
		</Query>
		<style jsx>{`
			.check-wrapper {
				border-width: 2px;
				border-radius: 5px;
				min-height: 120px;
				margin: 20px;
				justify-content: center;
				align-items: center;
				padding: 15px;
				text-align: center;
			}
			a {
				color: #fff;
				text-decoration: none;
			}
			a:hover div {
				opacity: 0.8;
			}
			p.lead {
				margin-top: 50px;
			}
		`}</style>
	</Layout>
);

export default Checks;
