import Layout from "../client/components/Layout";
import { GET_CHECKS } from "../queries";
import Link from "next/link";
import { Query } from "react-apollo";
import LoadingModule from "../client/components/LoadingModule";

const Checks = props => (
	<Layout title="Checks">
		<h2>Checks</h2>
		<hr/>
		<Query query={GET_CHECKS}>
			{({data: {getChecks}, loading, error}) => {
				if (loading) return <LoadingModule />
				if (error) return <div className="text-danger">{error.message}</div>;
				return getChecks.length ?
					<div className="row">
						{getChecks.map(check => (
							<div className="col-xs-12 col-sm-6 col-lg-4" key={check.id}>
								<Link href="">
									<a>
										<div className="card check-wrapper border-success">
											Check
										</div>
									</a>
								</Link>
							</div>
						))}
					</div> :
					<p className="text-center lead">There are currently no checks.</p>;
			}}
		</Query>
		<style jsx>{`
			hr {
				border-color: #F39C12;
			}
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
