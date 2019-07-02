const { ApolloServer, gql } = require('apollo-server');

const PORT = process.env.PORT || 5000;

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
	type Mutation {
		clearWithRules(rules: [String], submisson: String): [String]
	}

	type Query {
		currentClearings: [String]
	}
`;

const resolvers = {
	Mutation: {
		clearWithRules: (_, { rules, submission }) => {
			return [];
		}
	},
	Query: {
		currentClearings() {
			return [];
		}
	}
};

const server = new ApolloServer({
	cors: {
		origin: '*', // <- allow request from all domains
		credentials: true
	},
	typeDefs,
	resolvers
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen({ port: PORT }).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
