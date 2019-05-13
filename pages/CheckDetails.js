import Layout from "../client/components/Layout";
import { Mutation, Query } from "react-apollo";
import { GET_CHECK_DETAILS, GET_TABLE_BY_ID, GET_ITEMS } from "../queries";
import LoadingModule from "../client/components/LoadingModule";
import moment from "moment";
import Link from "next/link";
import TableNumber from "../client/components/TableNumber";
import { Modal, ListGroup } from "react-bootstrap";
import { ADD_ITEM, VOID_ITEM, CLOSE_CHECK } from "../mutations";

class CheckDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			showVoidModal: false,
			selectedItem: null,
			voidedItem: null
		};
	}

	openModal = () => {
		this.setState({
			showModal: true
		});
	}

	closeModal = () => {
		this.setState({
			showModal: false,
			selectedItem: null
		});
	}

	openVoidModal = () => {
		this.setState({
			showVoidModal: true
		});
	}

	closeVoidModal = () => {
		this.setState({
			showVoidModal: false,
			voidedItem: null
		});
	}

	addItem = addItem => {
		addItem();
		this.closeModal();
	}

	voidItem = voidItem => {
		voidItem();
		this.closeVoidModal();
	}

	selectItem = itemId => {
		this.setState({selectedItem: itemId});
	}

	selectVoidItem = itemId => {
		this.setState({voidedItem: itemId});
	}

	render() {
		return (
			<Layout title="Check Details">
				<h2>Check Details</h2>
				<hr className="border-warning" />
				<Query query={GET_CHECK_DETAILS} variables={{checkId: this.props.router.query.id}}>
					{({data: {getCheckDetails}, loading, error}) => {
						if (loading) return <LoadingModule />;
						if (error) return (<div className="text-danger">{error.message}</div>);
						const details = getCheckDetails;
						const total = details.closed ? details.orderedItems.filter(item => !item.voided).reduce((acc, val) => acc + val.price, 0) + details.tax + details.tip : details.orderedItems.filter(item => !item.voided).reduce((acc, val) => acc + val.price, 0);
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
								<div className="items-wrapper border-primary">
									<h4 className="d-flex align-content-center justify-content-between">
										Line Items
										{!details.closed &&
											<div>
												{details.orderedItems.filter(item => !item.voided).length > 0 && <button className="btn btn-sm btn-outline-danger" onClick={this.openVoidModal}>Void Item <i className="fas fa-ban"></i></button>}
												<button className="btn btn-sm btn-info" onClick={this.openModal}>Add New <i className="fas fa-plus"></i></button>
											</div>
										}
									</h4>
									<hr/>
									{details.orderedItems.length ? details.orderedItems.map((item, idx) => (
										<div className={item.voided ? "line-item voided text-muted" : "line-item"} key={idx}>
											{item.name} <span className="price">${item.price}</span>
										</div>
									)) : <p className="text-center"><em>There are currently no items on this check.</em></p>}
									{details.closed &&
										<React.Fragment>
											<hr/>
											<div
												className="line-item">Tax <span>${details.tax}</span>
											</div>
											<div
												className="line-item">Tip <span>${Math.round(details.tip * 100) / 100}</span>
											</div>
										</React.Fragment>
									}
									<hr/>
									<div className="line-item total">Total <span>${Math.round(total * 100) / 100}</span></div>
								</div>
								{/* Add Item Modal */}
								<Modal show={this.state.showModal} onHide={this.closeModal}>
									<Modal.Header closeButton>
										<Modal.Title>Add New Line Item</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<Query query={GET_ITEMS}>
											{({data: {getItems}, loading, error}) => {
												if (loading) return <LoadingModule />;
												if (error) return <div className="text-danger">{error.message}</div>;
												return (
													<ListGroup>
														{getItems.map((item, idx) => (
															<ListGroup.Item key={idx} action onClick={() => this.selectItem(item.id)} style={{outline: "none"}} className="d-flex align-content-center justify-content-between">
																{item.name} <span>${item.price}</span>
															</ListGroup.Item>
														))}
													</ListGroup>
												);
											}}
										</Query>
									</Modal.Body>
									<Modal.Footer>
										<button className="btn btn-sm btn-outline-dark" onClick={this.closeModal}>
											Cancel
										</button>
										<Mutation mutation={ADD_ITEM} variables={{checkId: details.id, itemId: this.state.selectedItem}} refetchQueries={[{query: GET_CHECK_DETAILS, variables: {checkId: this.props.router.query.id}}]}>
											{(addItem) => (
												<button className="btn btn-sm btn-success" onClick={() => this.addItem(addItem)} disabled={this.state.selectedItem === null}>
													Add Item
												</button>
											)}
										</Mutation>
									</Modal.Footer>
								</Modal>
								{/* Void Item Modal */}
								<Modal show={this.state.showVoidModal} onHide={this.closeVoidModal}>
									<Modal.Header closeButton>
										<Modal.Title>Void Ordered Item</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<ListGroup>
											{details.orderedItems.filter(item => !item.voided).map((item, idx) => (
												<ListGroup.Item key={idx} action onClick={() => this.selectVoidItem(item.id)} style={{outline: "none"}} className="d-flex align-content-center justify-content-between">
													{item.name}
												</ListGroup.Item>
											))}
										</ListGroup>
									</Modal.Body>
									<Modal.Footer>
										<button className="btn btn-sm btn-outline-dark" onClick={this.closeVoidModal}>
											Cancel
										</button>
										<Mutation mutation={VOID_ITEM} variables={{checkId: details.id, itemId: this.state.voidedItem}} refetchQueries={[{query: GET_CHECK_DETAILS, variables: {checkId: this.props.router.query.id}}]}>
											{(voidItem) => (
												<button className="btn btn-sm btn-success" onClick={() => this.voidItem(voidItem)} disabled={this.state.voidedItem === null}>
													Void Item
												</button>
											)}
										</Mutation>
									</Modal.Footer>
								</Modal>
								{!details.closed &&
									<Mutation mutation={CLOSE_CHECK} variables={{checkId: details.id}} refetchQueries={[{query: GET_CHECK_DETAILS, variables: {checkId: this.props.router.query.id}}]}>
										{(closeCheck) => (<button className="btn btn-danger" onClick={closeCheck}>Close Check</button>)}
									</Mutation>
								}
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
						border: 2px dotted;
						border-radius: 4px;
						background: #ccc;
						color: #222;
						padding: 20px 15px;
						margin-bottom: 30px;
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
					.line-item.voided {
						text-decoration: line-through;
					}
					.line-item .price {
						font-style: italic;
						font-size: 0.9em
					}
					.total {
						font-size: 20px;
					}
					.btn {
					text-transform: uppercase;
					}
				`}</style>
			</Layout>
		);
	}
}

export default CheckDetails;
