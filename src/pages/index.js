import Results from "@/components/Results";
import { findBus } from "@/utils/busFinder";
import { syncBusCache } from "@/utils/pwaCache";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Box, Container, TextField } from "@mui/material";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { toast } from 'react-toastify';
import { server } from "~/config";

export default function Home({ stops }) {
  const [fromValue, setFromValue] = useState(null);
  const [toValue, setToValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [matchedBuses, setMatchedBuses] = useState([]);
  const stopOptions = stops.sort((x, y) => x.en.localeCompare(y.en));
  const fromStops = stopOptions.filter(stop => stop.id !== toValue?.id);
  const toStops = stopOptions.filter(stop => stop.id !== fromValue?.id);
  const handleFrom = (event, value) => {
    setFromValue(value);
  };
  const handleTo = (event, value) => {
    setToValue(value);
  };
  const handleSearch = async () => {
    if (!fromValue || !toValue) return;
    setLoading(true);
    findBus(fromValue, toValue)
      .then(buses => {
        if (buses.length) setMatchedBuses(buses);
        else {
          setMatchedBuses([]);
          toast.error(`No buses found from ${fromValue.en} to ${toValue.en}`, {
          position: "bottom-center",
          autoClose: 6000,
        });}
      })
      .catch(error => {
        console.error('Error in findBus:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const result = useMemo(() => {
    return {
      from: fromValue?.id,
      to: toValue?.id,
      busList: matchedBuses
    }
  }, [matchedBuses]);

  useEffect(() => {
    const fetchBusUpdatedAt = async () => {
      const res = await fetch(`${server}/api/busUpdatedAt`);
      const data = await res.json();
      if (data) syncBusCache(data.busUpdatedAt);
    };

    fetchBusUpdatedAt();
  }, []);

  return (
    <>
      <Head>
        <title>Citybus BD</title>
        <meta name="description" content="Local bus finder app for Dhaka city" />
      </Head>
      <Container maxWidth="md" sx={{ marginTop: 2, paddingBottom: 10 }}>
        <Box className="font-cursive" sx={{ fontSize: 40, paddingY: 4, marginBottom: 6, textAlign: 'center' }}>
          Citybus BD
        </Box>
        <Box sx={{ marginBottom: 4 }}>
          <Autocomplete
            disablePortal
            sx={{ marginBottom: 2 }}
            value={fromValue}
            options={fromStops}
            onChange={handleFrom}
            renderInput={(params) => <TextField {...params} label="From" variant="filled" sx={{
              // Root class for the input field
              "& .MuiFilledInput-root": {
                color: "#000",
                backgroundColor: "#f4f4f4",
              },
              "& .MuiFilledInput-root:hover": {
                backgroundColor: "#f4f4f4",
              }
            }}/>}
          />

          <Autocomplete
            disablePortal
            sx={{ marginBottom: 2 }}
            value={toValue}
            options={toStops}
            onChange={handleTo}
            renderInput={(params) => <TextField {...params} label="To" variant="filled" sx={{
              // Root class for the input field
              "& .MuiFilledInput-root": {
                color: "#000",
                backgroundColor: "#f4f4f4",
              },
              "& .MuiFilledInput-root:hover": {
                backgroundColor: "#f4f4f4",
              }
            }} />}
          />
          <LoadingButton variant="contained" size='large' startIcon={<SearchOutlinedIcon />} loading={loading} onClick={handleSearch}>Search</LoadingButton>
        </Box>
      
        {matchedBuses.length ? <Results result={result} /> : null}

        <Box className="font-cursive" sx={{ textAlign: 'center', position: 'absolute', bottom: 10 }}>© <a style={{textDecoration: 'underline'}} href="https://thekhairul.github.io" target="_blank" rel="noreferrer">Khairul Anik</a> - {new Date().getFullYear()}</Box>
      </Container>
    </>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(`${server}/api/stops`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'referer': server
    },
  })
  const stops = await res.json()

  if (!stops) {
    return {
      notFound: true,
    }
  }

  return {
    props: { stops }, // will be passed to the page component as props
  }
}
