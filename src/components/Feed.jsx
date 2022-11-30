import { useState, useEffect} from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { SideBar, Videos } from './';

import { fetchFromAPI } from '../utils/fetchFromAPI';

function Feed() {

  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);

  // useEffect is lifecycle hook which directly gets called when the component initially loads
  useEffect(() => {
     fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
     .then((data) => setVideos(data.items)); // with asynchronous functions we have to chain a dot then 
  }, [selectedCategory]);

  return (
    <Stack sx={{
      flexDirection: {
        sx: 'column',  // sx means for in general
        md: 'row'     // md means for medium & large devices 
      }
    }}>
      <Box sx={{
        height: { sx: 'auto', md: '92vh' },
        borderRight: '1px solid #3d3d3d',
        px: { sx: 0, md: 2 }
      }}>
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

      
        <Typography className='copyright'
          variant='body2' sx={{ 
            mt: 1.5,
            color: '#fff'
          }}>
          Copyright 2022 Code Therapist
        </Typography> 
      </Box>
      <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2}}>
        <Typography variant='h4' fontWeight='bold' mb={2} sx={{ color: 'white'}}>
          {selectedCategory} <span style={{ color: '#F31503' }}>videos</span>
        </Typography>
          <Videos videos={videos} />
      </Box>

    </Stack>
  )
}

export default Feed;