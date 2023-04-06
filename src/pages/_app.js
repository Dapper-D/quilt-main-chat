import "../styles/App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { useEffect, useState } from "react";
import { NFTMarketplaceProvider } from "../../component/Context/NFTMarketplaceContext";
export default function App({ Component, pageProps }) {
  let auth = "";
  // const endpoint = process.env.GRAPHQL_URI;
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("token");
    auth = "Bearer " + token;
  }

  const client = new ApolloClient({
    uri: "https://api.lounge-quilt.com/",
    cache: new InMemoryCache(),
    headers: {
      authorization: auth,
    },
  });

  return (
    <div>
      <ApolloProvider client={client}>
        <NFTMarketplaceProvider>
          <Component {...pageProps} />
        </NFTMarketplaceProvider>
      </ApolloProvider>
    </div>
  );
}
