const LoadingModule = props => (
	<div className="loading-wrapper">
		<div className="fas fa-spinner fa-pulse"></div>
		<p>Loading...</p>
		<style jsx>{`
			.loading-wrapper {
				text-align: center;
				margin: 50px 0;
			}
			.fas {
				font-size: 32px;
			}
			p {
				margin: 3px 0 0;
			}
		`}</style>
	</div>
);

export default LoadingModule;
