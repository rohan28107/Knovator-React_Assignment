import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import Timer from './Components/Timer';

function App() {
  return (
    <ChakraProvider>
      <Timer />
    </ChakraProvider>
  );
}

export default App;
