import Results from "@/components/Results";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Box, Container, TextField } from "@mui/material";
import Head from "next/head";
import { useMemo, useState } from "react";
import { toast } from 'react-toastify';
import { server } from "~/config";

export default function Home({ stops }) {
  const [fromValue, setFromValue] = useState(null);
  const [toValue, setToValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [matchedBuses, setMatchedBuses] = useState([]);
  const stopOptions = stops.sort((x, y) => x.en.localeCompare(y.en));
  const handleFrom = (event, value) => {
    setFromValue(value);
  };
  const handleTo = (event, value) => {
    setToValue(value);
  };
  const handleSearch = async () => {
    if (!fromValue || !toValue) return;
    setLoading(true);
    const query = new URLSearchParams({
      from: fromValue.id,
      to: toValue.id
    }).toString();
    const res = await fetch(`${server}/api/bus?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'referer': server
      },
    });
    const buses = await res.json();
    if (!buses.length) {
      toast.error('No buses found', {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
    setMatchedBuses(buses);
    setLoading(false);
  };

  const result = useMemo(() => {
    return {
      from: fromValue?.id,
      to: toValue?.id,
      buses: matchedBuses
    }
  }, [matchedBuses]);

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
            options={stopOptions}
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
            options={stopOptions}
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
