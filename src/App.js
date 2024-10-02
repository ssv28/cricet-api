import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);               // To store match data
  const [seriesList, setSeriesList] = useState([]);   // To store series data for a specific match type


  useEffect(() => {
    allData();
  }, []);

  // data from API
  const allData = () => {
    axios
      .get("https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent", {
        headers: {
          'x-rapidapi-key': '86b399ecc2msh04a71e55aecf1d6p111bfajsn777923905878',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com',
        },
      })
      .then((res) => {
        console.log(res);
        
        console.log(res.data.typeMatches);
        setData(res.data.typeMatches);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  //(header tab)
  const handleMatchClick = (matchType) => {

    console.log("======>>>",matchType.seriesMatches);

    const setSeriesName = matchType.seriesMatches.map((seriesMatch) => seriesMatch.seriesAdWrapper?.seriesName).filter(Boolean)

    setSeriesList(setSeriesName)
    // setSeriesList(matchType.seriesMatches.map((seriesMatch) => seriesMatch.seriesAdWrapper?.seriesName).filter(Boolean)); 


  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Cricket Match Series</h1>
        <nav className="nav">
          {
            data.map((matchType, index) => (         //international, ledged, dynemic,women
              <div
                key={index}
                className="nav-item"
                onClick={() => handleMatchClick(matchType)}
              >
                {/* matches series */}
                {matchType.matchType}
              </div>
            ))
          }
        </nav>
      </header>

      {/* show series name in a card */}

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
