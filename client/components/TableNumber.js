const TableNumber = ({ number }) => (
	<React.Fragment>
		<span className="table-num border-success bg-primary">{number}</span>
		<style jsx>{`
			span {
				border: solid 3px;
				border-radius: 50%;
				width: 38px;
				height: 38px;
				display: inline-flex;
				justify-content: center;
				align-items: center;
				font-size: 20px;
				margin: 5px;
			}
		`}</style>
	</React.Fragment>
);

export default TableNumber;
