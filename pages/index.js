import Layout from "../client/components/Layout";

const Index = props => (
	<Layout title="Home">
		<h2>Welcome</h2>
		<hr className="border-warning" />
		<div className="jumbotron">
			<h3 className="text-success">The Greasy Spoon POS System</h3>
			<hr className="border-secondary" />
			<p className="lead">You can now easily manage your checks for each table you are serving.  Just use the navigation to view either all tables or all checks.</p>
			<ul>
				<li>You may view the details of any table. You may add a check to the table, but only if there are no currently opened checks for that table.</li>
				<li>To find checks quickly, you may filter open and closed checks when viewing the checks page.</li>
				<li>You may use either the table details or the check page to access the check details. On the check details, you may add or void items, calculate the total, and close the check.  Tax and tip will be calculated when the check is closed.</li>
			</ul>
			<h5 className="text-warning text-center">Bon Appetit!</h5>
		</div>
		<style jsx>{`
			.jumbotron {
				margin-top: 30px;
			}
			li {
				font-size: 16px;
				margin-bottom: 15px;
			}
			h5 {
				margin: 30px 0 0;
			}
		`}</style>
	</Layout>
);

export default Index;
