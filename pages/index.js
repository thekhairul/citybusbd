import { Box, Button, Container, Icon } from '@chakra-ui/react';
import Head from 'next/head';
import { useState } from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { IoMdLocate } from 'react-icons/io';
import { RiRouteLine } from 'react-icons/ri';
import NoResults from '../components/NoResults';
import ReactSelect from '../components/ReactSelect';
import Results from '../components/Results';

export default function Home({stops}) {
  const [fromValue, setFromValue] = useState(null);
  const [toValue, setToValue] = useState(null);
  const [matchedRoutes, setMatchedRoutes] = useState([]);
  const stopOptions = stops.sort((x,y) => x.slug.localeCompare(y.slug));

  const handleFromValue = e => {
    setFromValue(e.value.split('|')[0])
  }
  const handleToValue = e => {
    setToValue(e.value.split('|')[0])
  }
  const handleSearch = async () => {
    if (!fromValue || !toValue) return;
    const res = await fetch('http://localhost:3000/api/matchedRoutes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({from:fromValue, to:toValue})
    })
    const routes = await res.json()
    setMatchedRoutes(routes);
  }

  return (
    <div>
      <Head>
        <title>Citybus BD</title>
        <meta name="description" content="BRTA bus fare calculator and city bus finder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW='container.md'>
        <Box className='citybus-from' display='flex' alignItems='center' mb={6}>
          <Icon as={IoMdLocate} fontSize={22} ml={-7} mr={2} color='purple.500'/>
          <Box flex='1'>
            <ReactSelect options={stopOptions} placeholder="From" onChange={handleFromValue}/>
          </Box>
        </Box>
        <Box display='flex' alignItems='center' mb={6}>
          <Icon as={HiLocationMarker} fontSize={22} ml={-7} mr={2} color='purple.500'/>
          <Box flex='1'>
            <ReactSelect options={stopOptions} placeholder="To" onChange={handleToValue}/>
          </Box>
        </Box>
        <Button colorScheme='purple' width='full' leftIcon={<RiRouteLine/>} onClick={handleSearch}>Search Routes</Button>
        {matchedRoutes.length ? <Results from={fromValue} to={toValue} matchedRoutes={matchedRoutes}/> : <NoResults />}
      </Container>

    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch('http://localhost:3000/api/stops')
  const stops = await res.json()

  if (!stops) {
    return {
      notFound: true,
    }
  }

  return {
    props: {stops}, // will be passed to the page component as props
  }
}
