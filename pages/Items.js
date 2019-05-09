import Layout from "../client/components/Layout";
import { GET_ITEMS } from "../queries";
import Link from "next/link";
import { Query } from "react-apollo";
import LoadingModule from "../client/components/LoadingModule";

const Items = props => (
	<Layout title="Items">
		<h2>Items</h2>
		<hr/>
		<Query query={GET_ITEMS}>
			{({data: {getItems}, loading, error}) => {
				if (loading) return <LoadingModule />;
				if (error) return <div className="text-danger">{error.message}</div>;
				return (
					<div className="row">
						{getItems.map(item => (
							<div className="col-xs-12 col-sm-6 col-lg-4" key={item.id}>
								<Link href="">
									<a>
										<div className="card item-wrapper border-success">
											<h4>{item.name}</h4>
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
				border-color: #F39C12;
			}
			.item-wrapper {
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
			h4 {
				margin: 0;
			}
		`}</style>
	</Layout>
);

export default Items;
