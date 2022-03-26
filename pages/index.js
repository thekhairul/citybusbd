import { Box, Button, Container, Icon } from '@chakra-ui/react';
import Head from 'next/head';
import { useState } from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { IoMdLocate } from 'react-icons/io';
import { RiRouteLine } from 'react-icons/ri';
import NoResults from '../components/NoResults';
import ReactSelect from '../components/ReactSelect';
import Results from '../components/Results';
import { server } from '../config';


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
    const res = await fetch(`${server}/api/matchedRoutes`, {
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
    <div className='app'>
      <Head>
        <title>Citybus BD</title>
        <meta name="description" content="BRTA bus fare calculator and city bus finder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW='container.md' px={8} py={6} className='app-main'>
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

      <footer className='app-footer'>
        <Box display='flex' flexDirection='column' alignItems='center' p={6} textAlign='center'>
          <p>
            &copy; Copyright- <a href='https://vuefolio-thekhairul.vercel.app/' rel='noreferrer' target='_blank'>Khairul Anik</a>, 2022.
            Built with <a href="https://nextjs.org/" rel='noreferrer' target='_blank'>Next.js</a> and&nbsp;
            <a href="https://chakra-ui.com/" rel='noreferrer' target='_blank'>Chakra UI</a>
          </p>
          <p>
            Bus data taken from  <a href="http://www.brta.gov.bd/sites/default/files/files/brta.portal.gov.bd/page/2e6949b3_de20_460e_b816_3f03631d430f/2021-11-10-09-58-131955c06e220d990cd6ad1a5206f168.pdf" rel='noreferrer' target='_blank'>BRTA</a>
          </p>
        </Box>
      </footer>

    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`${server}/api/stops`)
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
