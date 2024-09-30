import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';  // Import custom CSS for styling

const App = () => {
  const [data, setData] = useState([]);               // To store match data
  const [seriesList, setSeriesList] = useState([]);   // To store series data for a specific match type

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from API
  const fetchData = () => {
    axios
      .get("https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent", {
        headers: {
          'x-rapidapi-key': '86b399ecc2msh04a71e55aecf1d6p111bfajsn777923905878',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com',
        },
      })
      .then((res) => {
        const typeMatches = res.data.typeMatches || [];
        setData(typeMatches); // Update state with the match types
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle when a match type is clicked (header tab)
  const handleMatchClick = (matchType) => {
    // Filter series matches based on the matchType (e.g., "International")
    const seriesMatches = matchType.seriesMatches.map((seriesMatch) => {
      return seriesMatch.seriesAdWrapper?.seriesName;
    }).filter(Boolean); // Remove any undefined/null entries

    setSeriesList(seriesMatches); // Update series list
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Cricket Match Series</h1>
        <nav className="nav">
          {data.map((matchType, index) => (
            <div 
              key={index} 
              className="nav-item" 
              onClick={() => handleMatchClick(matchType)}
            >
              {matchType.matchType}
            </div>
          ))}
        </nav>
      </header>

      {/* Display series names in a card-like layout */}
      <div className="series-list">
        {
       
          seriesList.map((seriesName, index) => (
            
            <div key={index} className="series-card">
              <p>{seriesName}</p>
            </div>
            
          ))
        
        }
      </div>
    </div>
  );
};

export default App;
