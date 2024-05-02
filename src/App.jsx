import  { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import './App.css';

function App() {
  const [photos, setPhotos] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(1);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      //fetching data
      const response = await fetch('https://jsonplaceholder.typicode.com/photos');
      // Parsing Response
      const data = await response.json();
      // Updating State    
      setPhotos(data);
    } catch (error) {
      //Error Handling
      console.error('Error fetching photos:', error);
    }
  };

  const handleChange = (event) => {
    setSelectedAlbumId(event.target.value);
  };


  const filteredPhotos = photos.filter(photo => photo.albumId === selectedAlbumId);



  return (
    <div  className="app-container">
      <h1>React Carousel App</h1>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="select-control">
        <InputLabel id="album-select-label">Select Album</InputLabel>
        <Select
          labelId="album-select-label"
          id="album-select"
          value={selectedAlbumId}
          label="Select Album"
          onChange={handleChange}
        >
          {[...Array(10).keys()].map(num => (
            <MenuItem key={num + 1} value={num + 1}>{num + 1}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Carousel autoPlay
      showThumbs={true}
      showIndicators={false}>
        {filteredPhotos.map(photo => (
          <div key={photo.id} className="carousel-item">
            <img src={photo.url} alt={photo.title} />
            <p className="photo-title">{photo.title}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default App;
