import App from "next/app";
import {ApolloProvider} from "react-apollo";
import client from "../client/setup";

class YouGotServed extends App {
	render() {
		const {Component} = this.props;
		return (
			<ApolloProvider client={client}>
				<Component {...this.props} />
			</ApolloProvider>
		);
	}
}

export default YouGotServed;
