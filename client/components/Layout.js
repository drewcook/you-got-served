import Head from "next/head";
import Navigation from "./Navigation";

const Layout = props => (
	<div>
		<Head>
			<link rel="stylesheet" href="/static/css/bootstrap.min.css" />
			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous" />
			<title>You Got Served | {props.title}</title>
		</Head>
		<div className="row">
			<div className="col-md-3 nav-wrapper">
				<aside>
					<Navigation />
				</aside>
			</div>
			<div className="col-md-9 page-wrapper">
				<div className="container">
					{props.children}
				</div>
			</div>
		</div>
		<style jsx>{`
			.row {
				margin: 0;
			}
			.nav-wrapper {
				background: #555;
			}
			.page-wrapper {
				padding-top: 50px;
				padding-bottom: 50px;
			}
			@media (min-width: 768px) {
				.nav-wrapper {
					min-height: 100vh;
				}
			}
		`}</style>
	</div>
);

export default Layout;
