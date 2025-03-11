import { useState } from 'react';
import './App.css';
import SearchFunction from './component/SearchFunction';

function App() {
  const [data, setData] = useState<any>(null);
  const [query, setQuery] = useState<string>('Auckland City');

  const handleQueryUpdate = async (newQuery: string) => {
    setQuery(newQuery); // Update the query state

    try {
      const response = await fetch(`http://localhost:3000/api/search?query=${encodeURIComponent(newQuery)}`);
      if (!response.ok) throw new Error('Failed to fetch');
      
      const jsonData = await response.json();
      setData(jsonData); // Store the results in state
      console.log(jsonData)
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <>
      <SearchFunction query={query} setQuery={handleQueryUpdate} />
      <div>
    
      </div>
    </>
  );
}

export default App;
