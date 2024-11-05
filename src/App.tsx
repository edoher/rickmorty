import GridContainer from './GridContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <GridContainer />
        </QueryClientProvider>
    );
};

export default App;
