// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react';

// // const App = () => {
// //   let [data, setData] = useState([]);

// //   useEffect(() => {
// //     // API call
// //     axios
// //       .get("https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent", {
// //         headers: {
// //           'x-rapidapi-key': '86b399ecc2msh04a71e55aecf1d6p111bfajsn777923905878',
// //           'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com',
// //         },
// //       })
// //       .then((res) => {
// //         console.log(res.data);
// //         setData(res.data);
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //       });
// //   }, []);

// //   return (
// //     <>

// //     </>
// //   );
// // };

// // export default App;
// import axios from 'axios';
// import React, { useState } from 'react';

// const App = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchData = () => {
//     setIsLoading(true); // Show loading state during API call
//     axios
//       .get("https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent", {
//         headers: {
//           'x-rapidapi-key': '86b399ecc2msh04a71e55aecf1d6p111bfajsn777923905878',
//           'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com',
//         },
//       })
//       .then((res) => {
//         console.log(res.data);
//         setData(res.data.filters); // Update state with the API response data
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(() => {
//         setIsLoading(false); // Hide loading state after API call
//       });
//   };

//   return (
//     <div>
//       <button onClick={fetchData}>Fetch Match Types</button>

//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul>
//           {data?.matchType?.map((match, index) => (
//             <button key={index}>{match}</button>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default App;

import axios from 'axios';
import React, { useState } from 'react';

const App = () => {
  const [data, setData] = useState([]);               // To store match data
  const [isLoading, setIsLoading] = useState(false); // To manage loading state
  const [selectedSeriesName, setSelectedSeriesName] = useState(""); // To store selected series name

  // Fetch data from API
  const fetchData = () => {
    setIsLoading(true); // Show loading state during API call
    axios
      .get("https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent", {
        headers: {
          'x-rapidapi-key': '86b399ecc2msh04a71e55aecf1d6p111bfajsn777923905878',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com',
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data.filters); // Update state with the match list data
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false); // Hide loading state after API call
      });
  };

  // Handle when a match type button is clicked
  const handleMatchClick = (match) => {
    setSelectedSeriesName(match.matchType.seriesName); // Display series name when match is clicked
    console.log(match.matchType.seriesName);
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Match Types</button>


      <div>

      {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {data?.matchType?.map((match, index) => (
              <button key={index} onClick={handleMatchClick}>{match}</button>
            ))}
          </ul>
        )}
      </div>


      {/* Display selected series name */}
      {selectedSeriesName && (

        <p>Series Name: {selectedSeriesName}</p>

      )}
    </div>
  );
};

export default App;
