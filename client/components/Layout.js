import Head from "next/head";

const Layout = props => (
	<div>
		<Head>
			<link rel="stylesheet" href="/static/css/bootstrap.min.css" />
			<title>{props.title}</title>
		</Head>
		<div className="container">
			{props.children}
		</div>
	</div>
);

export default Layout;
