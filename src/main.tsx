import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import client from "./apolloClient";
import CustomRainbowKitProvider from "./providers/RainbowKit.tsx";
import { ApolloProvider } from '@apollo/client'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <CustomRainbowKitProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CustomRainbowKitProvider>
    </ApolloProvider>
  </StrictMode>
);
