import { useState } from 'react';
import './App.css';
import SearchFunction from './component/SearchFunction';
import ImageGallery from './component/ImageGallery';

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
    <div className='max-w-screen min-h-screen  bg-radial-[at_25%_25%] from-white to-zinc-900 to-75% '>
      <div className='mx-32 flex flex-col items-center justify-center'>
      <SearchFunction query={query} setQuery={handleQueryUpdate} />
      <div>
      

    {/* If data is loaded we render image gallery */}

     {data && <ImageGallery images={data} likedImages={[]} />} 

      </div>

      </div>
    </div>
  );
}

export default App;
