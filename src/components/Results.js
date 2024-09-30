import AltRouteOutlinedIcon from '@mui/icons-material/AltRouteOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DirectionsBusFilledTwoToneIcon from '@mui/icons-material/DirectionsBusFilledTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Accordion, AccordionDetails, AccordionSummary, Box, Tooltip } from '@mui/material';

const stopNormal = {
    padding: 1,
    borderRadius: 1,
    border: '1px solid #ccc',
};
const stopSelected = {
    ...stopNormal,
    border: '2px dashed #000',
}

const Results = ({ result: { from, to, buses } }) => {
    const b1 = buses[0];
    const distance = b1.stopagePairs[`${from}:${to}`]?.distance || b1.stopagePairs[`${to}:${from}`]?.distance;
    const price = distance > 0 ? Math.ceil(distance * 2.42) : 0;

    return (
        <>
            <Box sx={{ borderRadius: 1, marginBottom: 1, overflow: 'hidden' }}>
                <Box className="font-sans" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, bgcolor: '#fff', borderBottom: '1px solid #ccc', padding: 2, textAlign: 'center', fontWeight: 700, fontSize: 20 }}>
                    <DirectionsBusFilledTwoToneIcon fontSize="large" />
                    <span>Found {buses.length} bus{buses.length > 1 ? 'es' : ''}</span>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Box className="font-sans" sx={{ bgcolor: '#fff', padding: 4, display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center', gap: 1, fontWeight: 700, fontSize: 20 }}>
                        <AltRouteOutlinedIcon />
                        <span>{distance} km</span>
                    </Box>
                    <Box className="font-sans" sx={{ bgcolor: '#fff', borderLeft: '1px solid #ccc', padding: 4, display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center', gap: 1, fontWeight: 700, fontSize: 20 }}>
                        <AttachMoneyIcon />
                        <span>{price < 10 ? 10 : price} Tk</span>
                        <Tooltip title="2.42 Tk per km and minimum fair is 10 Tk" arrow>
                            <InfoOutlinedIcon></InfoOutlinedIcon>
                        </Tooltip>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ paddingY: 2 }}>
                {buses.map((bus, index) => {
                    return (
                        <Accordion key={bus._id} defaultExpanded={index === 0}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', paddingRight: 2 }}>
                                    <h4 className="font-sans">{bus.name}</h4>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                {bus.stopages.map((stop, idx) => (
                                    <>
                                        <Box className="font-sans" key={stop.id} sx={stop.id === from || stop.id === to ? stopSelected : stopNormal}>
                                            {stop.en}
                                        </Box>
                                        {idx === bus.stopages.length - 1 ? null : <SyncAltIcon />}
                                    </>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </Box>
        </>
    );
};

export default Results;