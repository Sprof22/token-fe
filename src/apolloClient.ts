import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// const GRAPHQL_API_URL = "https://api.thegraph.com/subgraphs/name/YOUR_SUBGRAPH_NAME";
const GRAPHQL_API_URL = "https://api.studio.thegraph.com/query/106861/contractfactory/version/latest";

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_API_URL }),
  cache: new InMemoryCache(),
});

export default client;
