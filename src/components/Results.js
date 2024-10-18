import AltRouteOutlinedIcon from '@mui/icons-material/AltRouteOutlined';
import DirectionsBusFilledTwoToneIcon from '@mui/icons-material/DirectionsBusFilledTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { TbCurrencyTaka } from "react-icons/tb";

const stopNormal = {
    padding: 1,
    borderRadius: 1,
    border: '1px solid #ccc',
};
const stopSelected = {
    ...stopNormal,
    border: '2px dashed #000',
}
const pricePerKm = 2.42;

const Results = ({ result: { from, to, busList } }) => {
    const buses = busList.map(bus => {
        const fromStopIndex = bus.stopages.findIndex(stop => stop.id === from);
        const toStopIndex = bus.stopages.findIndex(stop => stop.id === to);
        if (fromStopIndex > toStopIndex) return { ...bus, stopages: bus.stopages.reverse() };
        return bus;
    });
    const totalDistance = buses.reduce((total, bus) => {
        const [stopage1, stopage2] = bus.stopages.filter(stop => stop.id === from || stop.id === to);
        const distance = Math.abs(stopage1.distanceFromRoot - stopage2.distanceFromRoot);
        return total + distance;
    }, 0);
    const distance = (totalDistance / buses.length) / 1000; // average distance in km
    const price = distance > 0 ? Math.ceil(distance * pricePerKm) : 0;
    
    return (
        <motion.div key={`${from}-${to}`} initial={{ opacity: 0, translateY: '20px' }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: 0.5 }}>
            <Box sx={{ bgcolor: '#fff', borderRadius: 1, marginBottom: 1, overflow: 'hidden' }}>
                <Box className="font-sans" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, borderBottom: '1px solid #ccc', padding: 2, textAlign: 'center', fontWeight: 700, fontSize: 20 }}>
                    <DirectionsBusFilledTwoToneIcon fontSize="large" />
                    <span>Found {buses.length} bus{buses.length > 1 ? 'es' : ''}</span>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Box className="font-sans" sx={{ paddingY: 4, paddingX: 2, display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center', gap: 1, fontWeight: 700, fontSize: 20 }}>
                        <AltRouteOutlinedIcon />
                        <span>{distance.toPrecision(2)} km</span>
                    </Box>
                    <Box className="font-sans" sx={{ borderLeft: '1px solid #ccc', paddingY: 4, paddingX: 2, display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center', gap: 1, fontWeight: 700, fontSize: 20 }}>
                        <TbCurrencyTaka fontSize={24}/>
                        <span>{price < 10 ? 10 : price} Tk</span>
                    </Box>
                </Box>
                <Box sx={{ padding: 2, borderTop: '1px solid #ccc' }}>
                    <p className='font-sans'>
                        <b>Note:</b> Actual distance and price may vary. Government rate is <b>{pricePerKm} Tk per km</b>.
                    </p>
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
                                    <Box key={stop.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                        <Box className="font-sans" sx={stop.id === from || stop.id === to ? stopSelected : stopNormal}>
                                            {stop.en}
                                        </Box>
                                        {idx === bus.stopages.length - 1 ? null : <SyncAltIcon />}
                                    </Box>
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