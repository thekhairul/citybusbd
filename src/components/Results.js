import AltRouteOutlinedIcon from '@mui/icons-material/AltRouteOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DirectionsBusFilledTwoToneIcon from '@mui/icons-material/DirectionsBusFilledTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Accordion, AccordionDetails, AccordionSummary, Box, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';

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
    const totalDistance = buses.reduce((total, bus) => {
        const [stopage1, stopage2] = bus.stopages.filter(stop => stop.id === from || stop.id === to);
        const distance = Math.abs(stopage1.distanceFromRoot - stopage2.distanceFromRoot);
        return total + distance;
    }, 0);
    const distance = (totalDistance / buses.length) / 1000; // average distance in km
    const price = distance > 0 ? Math.ceil(distance * 2.42) : 0;

    return (
        <motion.div key={`${from}-${to}`} initial={{ opacity: 0, translateY: '20px' }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: 0.5 }}>
            <Box sx={{ borderRadius: 1, marginBottom: 1, overflow: 'hidden' }}>
                <Box className="font-sans" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, bgcolor: '#fff', borderBottom: '1px solid #ccc', padding: 2, textAlign: 'center', fontWeight: 700, fontSize: 20 }}>
                    <DirectionsBusFilledTwoToneIcon fontSize="large" />
                    <span>Found {buses.length} bus{buses.length > 1 ? 'es' : ''}</span>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Box className="font-sans" sx={{ bgcolor: '#fff', paddingY: 4, paddingX: 2, display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center', gap: 1, fontWeight: 700, fontSize: 20 }}>
                        <AltRouteOutlinedIcon />
                        <span>{distance.toPrecision(2)} km</span>
                        <Tooltip title="approximate average distance" enterTouchDelay={0} arrow>
                            <InfoOutlinedIcon></InfoOutlinedIcon>
                        </Tooltip>
                    </Box>
                    <Box className="font-sans" sx={{ bgcolor: '#fff', borderLeft: '1px solid #ccc', paddingY: 4, paddingX: 2, display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center', gap: 1, fontWeight: 700, fontSize: 20 }}>
                        <AttachMoneyIcon />
                        <span>{price < 10 ? 10 : price} Tk</span>
                        <Tooltip title="2.42 Tk per km. minimum fair 10 Tk" enterTouchDelay={0} arrow>
                            <InfoOutlinedIcon></InfoOutlinedIcon>
                        </Tooltip>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ paddingY: 2 }}>
                {buses.map((bus, index) => {
                    return (
                        <Accordion key={bus._id}>
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
        </motion.div>
    );
};

export default Results;