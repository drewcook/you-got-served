import Link from "next/link";

const Navigation = props => (
	<nav>
		<span className="fa-stack fa-2x icon">
		    <i className="fas fa-circle fa-stack-2x text-success"></i>
		    <i className="fas fa-utensil-spoon fa-stack-1x fa-inverse"></i>
		</span>
		<h1>The Greasy Spoon</h1>
		<hr/>
		<ul>
			<li><Link href="/"><a title="Home">Home</a></Link></li>
			<li><Link href="/Tables" as="/tables"><a title="Tables">Tables</a></Link></li>
			{/*<li><Link href="/Items" as="/items"><a title="Items">Items</a></Link></li> not necessary */}
			<li><Link href="/Checks" as="/checks"><a title="Checks">Checks</a></Link></li>
		</ul>
		<style jsx>{`
			h1 {
				font-size: 24px;
				margin-bottom: 10px;
				text-align: center;
			}
			.icon {
				display: block;
				margin: 0 auto 10px;
			}
			hr {
				border-color: #F39C12;
			}
			.fa-inverse {
				color: #fff;
			}
			ul {
				list-style: none;
				margin: 0;
				padding: 0;
			}
			ul li {
				font-size: 20px;
				padding: 5px 0;
				text-align: right;
				margin-right: 10px;
			}
			a {
				text-decoration: none;
				color: #fff;
			}
			a:hover {
				color: #F39C12;
				text-decoration: none;			
			}
			@media (max-width: 767px) {
				nav {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 10px 15px;
				}
				h1 {
					text-align: left;
				}
				h1, ul, li {
					display: inline-block;
					margin-bottom: 0;
				}
				ul li {
					font-size: 17px;
					margin-right: 13px;
				}
			}
		`}</style>
	</nav>
);

export default Navigation;
