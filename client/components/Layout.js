import Head from "next/head";
import Navigation from "./Navigation";

const Layout = (props) => (
	<div>
		<Head>
			{/* Normally I would load things locally or compile statics through for a singular request */}
			<link rel="stylesheet" href="/static/css/bootstrap.min.css" />
			<link
				rel="stylesheet"
				href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
				integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
				crossOrigin="anonymous"
			/>
			<title>You Got Served | {props.title}</title>
		</Head>
		<div className="row">
			<div className="col-md-3 nav-wrapper bg-light">
				<aside>
					<Navigation />
					<span className="copyright text-center">
						&copy; {new Date().getFullYear()} | YOU GOT SERVED
					</span>
				</aside>
			</div>
			<div className="col-md-9 page-wrapper">
				<div className="container">{props.children}</div>
			</div>
		</div>
		<footer className="hidden-md bg-light">
			<span className="text-center">
				&copy; {new Date().getFullYear()} | YOU GOT SERVED
			</span>
		</footer>
		<style jsx>{`
			.row {
				margin: 0;
			}
			.page-wrapper {
				padding-top: 30px;
				padding-bottom: 70px;
			}
			.copyright {
				display: none;
			}
			footer {
				padding: 7px 0;
				text-align: center;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				font-size: 12px;
			}
			@media (min-width: 768px) {
				.nav-wrapper {
					padding-top: 20px;
					min-height: 100vh;
					position: relative;
					border-right: 2px solid #f39c12;
				}
				.page-wrapper {
					padding-top: 70px;
				}
				.copyright {
					display: block;
					position: absolute;
					bottom: 30px;
					left: 0;
					right: 0;
					font-size: 12px;
				}
				footer {
					display: none;
				}
			}
		`}</style>
	</div>
);

export default Layout;
