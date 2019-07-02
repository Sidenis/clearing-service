const { ApolloServer, gql } = require('apollo-server');

const PORT = process.env.PORT || 5000;
const TIME_OUT = 1500;

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
	enum LOB {
		LIABILITY
		PROPERTY
	}

	enum STATUS {
		DONE
		PROGRESS
		MANUAL
	}

	enum PERIL {
		FIRE
		NAT_CAT
		TERRORISM
	}

	type RuleApplied {
		rule:String
		status:STATUS
	}
	input RulesAppliedInput{
		rule:String
		status:STATUS
	}
	type Submission {
		id: ID!
		lob: LOB!
		country: String!
		insuredCompany: String!
		address: String!
		broker: String!
		peril: PERIL!
		rules:[RuleApplied]!
	}
	input SubmissionInput {
		id: ID!
		lob: LOB!
		country: String!
		insuredCompany: String!
		address: String!
		broker: String!
		peril: PERIL!
		rules:[RulesAppliedInput]!
	}
	type Mutation {
		clearWithRules(submission:SubmissionInput): Boolean
	}

	type Query {
		currentClearing: Submission
	}
`;
let currentClearing = null;

const resolvers = {
	Mutation: {
		clearWithRules: (_, { rules, submission }) => {
			if (currentClearing) {
				return false;
			} else {
				currentClearing = {
					rules,
					submission
				};
				return true;
			}
		}
	},
	Query: {
		currentClearing() {
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
