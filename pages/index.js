import Layout from "../client/components/Layout";

const Index = props => (
	<Layout title="Home">
		<h2>Welcome</h2>
		<hr className="border-warning" />
		<div className="jumbotron">
			<h3>The Greasy Spoon POS System</h3>
			<p className="lead">You can now easily manage your checks for each table you are serving.  Just use the navigation to view all tables, items, or checks.</p>
			<p>To add an item to a check, You may either use the table details or the check page to access the check details.  On the check details, you may add or void items, calculate the total, and close the check.</p>
			<p>You may filter open and closed checks when viewing the checks page.</p>
		</div>
		<style jsx>{`
			.jumbotron {
				margin-top: 30px;
			}
		`}</style>
	</Layout>
);

export default Index;
