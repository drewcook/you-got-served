import Layout from "../client/components/Layout";
import {Query} from "react-apollo";
import {GET_TABLES} from "../queries";
import Link from "next/link";

const Tables = props => (
	<Layout title="Tables">
		<h2>Tables</h2>
		<hr/>
		<Query query={GET_TABLES}>
			{({data: {getTables}, loading, error}) => {
				if (loading) return <div>Loading...</div>;
				if (error) return <div className="text-danger">{error.message}</div>;
				return (
					<div className="row">
						{getTables.map(table => (
							<div className="col-xs-6 col-sm-4" key={table.id}>
								<Link href="">
									<a>
										<div className="card table-wrapper bg-primary border-dark" key={table.id}>
											<span className="bg-success">{table.number}</span>
										</div>
									</a>
								</Link>
							</div>
						))}
					</div>
				);
			}}
		</Query>
		<style jsx>{`
			hr {
				border-color: #fff;
			}
			.table-wrapper {
				border-width: 2px;
				border-radius: 5px;
				min-height: 100px;
				margin: 20px;
				justify-content: center;
				align-items: center;
				padding: 15px;
			}
			a {
				color: #fff;
				text-decoration: none;
			}
			a:hover div {
				opacity: 0.8;
			}
			span {
				border-radius: 50%;
				width: 50px;
				height: 50px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26px;
			}
		`}</style>
	</Layout>
);

export default Tables;
