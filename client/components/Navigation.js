import Link from "next/link";

const Navigation = props => (
	<nav>
		<h1>YOU GOT SERVED</h1>
		<ul>
			<li><Link href="/"><a title="Home">Home</a></Link></li>
			<li><Link href="/Tables" as="tables"><a title="Tables">Tables</a></Link></li>
			<li><Link href="/Items" as="items"><a title="Items">Items</a></Link></li>
			<li><Link href="/Checks" as="checks"><a title="Checks">Checks</a></Link></li>
		</ul>
		<style jsx>{`
		
		`}</style>
	</nav>
);

export default Navigation;
