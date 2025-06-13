import { ApolloProvider } from '@apollo/client';
import { client } from '@utils/ApolloClient';
import Layouts from '@layouts/Index';
const App = () => {
  return (
    <ApolloProvider client={client}>
      <Layouts />
    </ApolloProvider>
  );
};
App.whyDidYouRender = true; // Enable WDYR for this component

export default App;
