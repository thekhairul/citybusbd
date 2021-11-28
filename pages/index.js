import { Box, Button, Container } from '@chakra-ui/react';
import Head from 'next/head';
import { useState } from 'react';
import Select from 'react-select';

export default function Home({stops}) {
  const [fromValue, setFromValue] = useState(null);
  const [toValue, setToValue] = useState(null);
  const [matchedRoutes, setMatchedRoutes] = useState(null);
  const stopOptions = stops.sort((x,y) => x.label.localeCompare(y.label));

  const handleFromValue = e => {
    setFromValue(e.value.split('|')[0])
  }
  const handleToValue = e => {
    setToValue(e.value.split('|')[0])
  }
  const handleSearch = async () => {
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
        <Box mt={6} />
        <Select options={stopOptions} placeholder="From" onChange={handleFromValue}/>
        <Box mt={6} />
        <Select options={stopOptions} placeholder="To" onChange={handleToValue}/>
        <Box mt={6} />
        <Button colorScheme='blue' onClick={handleSearch}>Search</Button>
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
