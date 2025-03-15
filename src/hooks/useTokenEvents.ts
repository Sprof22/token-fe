import { useQuery, gql } from "@apollo/client";

const GET_TOKENS_CREATED = gql`
  query GetTokensCreated {
    tokenCreateds(orderBy: blockNumber, orderDirection: desc) {
      id
      tokenAddress
      name
      symbol
      decimals
      totalSupply
      creator
    }
  }
`;

export const useTokenEvents = () => {
  const { loading, error, data, refetch } = useQuery(GET_TOKENS_CREATED);
  console.log(data, 'data')

  return { loading, error, tokens: data?.tokenCreateds || [], refetch };
};
