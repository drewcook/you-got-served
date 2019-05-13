import Layout from "../client/components/Layout";
import { GET_CHECKS, GET_TABLE_BY_ID } from "../queries";
import { Mutation, Query } from "react-apollo";
import LoadingModule from "../client/components/LoadingModule";
import CheckCard from "../client/components/CheckCard";
import {Nav} from "react-bootstrap";
import { DELETE_ALL_CHECKS } from "../mutations";

class Checks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checks: null,
			filter: null
		}
	}

	filterChecks = (e, filter) => {
		// remove any active classe, then add active class to item
		document.querySelectorAll(".nav-link").forEach(v => {
			if (v.classList.contains("active")) {
					v.classList.remove("active");
				}
			}
		);
		e.target.classList.add("active");
		this.setState({filter});
	}

	render() {
		return (
			<Layout title="Checks">
				<h2>Checks</h2>
				<hr className="border-warning" />
				<div className="pill-wrapper d-flex align-content-center justify-content-between">
					<ul className="nav nav-pills">
						<li className="nav-item">
							<a className="nav-link active" onClick={e => this.filterChecks(e, null)}>All</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" onClick={e => this.filterChecks(e, "open")}>Open</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" onClick={e =>this.filterChecks(e, "closed")}>Closed</a>
						</li>
					</ul>
					<Mutation mutation={DELETE_ALL_CHECKS} refetchQueries={[{query: GET_CHECKS}]}>
						{(deleteAllChecks) => <button className="btn btn-sm btn-outline-danger" onClick={deleteAllChecks}>Delete All</button>}
					</Mutation>
				</div>
				<Query query={GET_CHECKS}>
					{({data: {getChecks}, loading, error}) => {
						if (loading) return <LoadingModule />
						if (error) return <div className="text-danger">{error.message}</div>;
						if (!getChecks.length) return (<p className="text-center lead">There are currently no checks.</p>);
						if (!this.state.filter) return (
							<div className="row">
								{getChecks.map((check, idx) => (
									<div className="col-xs-12 col-sm-6 col-lg-4" key={idx}>
										<Query query={GET_TABLE_BY_ID} variables={{id: check.tableId}}>
											{({loading, error}) => {
												if (loading) return <LoadingModule />;
												if (error) return (<div className="text-danger">{error.message}</div>);
												return (
													<CheckCard check={check} />
												);
											}}
										</Query>
									</div>
								))}
							</div>
						);
						if (this.state.filter === "open") {
							return (
								<div className="row">
									{getChecks.filter(check => !check.closed).map((check, idx) => (
										<div className="col-xs-12 col-sm-6 col-lg-4" key={idx}>
											<Query query={GET_TABLE_BY_ID} variables={{id: check.tableId}}>
												{({loading, error}) => {
													if (loading) return <LoadingModule />;
													if (error) return (<div className="text-danger">{error.message}</div>);
													return (
														<CheckCard check={check} />
													);
												}}
											</Query>
										</div>
									))}
								</div>
							);
						} else {
							return (
								<div className="row">
									{getChecks.filter(check => check.closed).map((check, idx) => (
										<div className="col-xs-12 col-sm-6 col-lg-4" key={idx}>
											<Query query={GET_TABLE_BY_ID} variables={{id: check.tableId}}>
												{({loading, error}) => {
													if (loading) return <LoadingModule />;
													if (error) return (<div className="text-danger">{error.message}</div>);
													return (
														<CheckCard check={check} />
													);
												}}
											</Query>
										</div>
									))}
								</div>
							);
						}
					}}
				</Query>
				<style jsx>{`
					.pill-wrapper {
						margin: 20px 0 40px;
					}
					.nav-link {
						padding: 5px 10px;
						min-width: 50px;
						margin-right: 10px;
						text-align: center;
					}
					.nav-link:hover {
						background: #666;
						cursor: pointer;
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
					.btn-outline-danger {
						text-transform: uppercase;
					}
				`}</style>
			</Layout>
		);
	}
}

export default Checks;
