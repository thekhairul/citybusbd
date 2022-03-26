import {
  Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Icon, Text, Tooltip
} from '@chakra-ui/react';
import { GoInfo } from 'react-icons/go';
import { RiArrowLeftRightLine } from 'react-icons/ri';

function Results({from, to, matchedRoutes}) {
    return (
        <Accordion my={10} bg='white' rounded='lg' boxShadow='lg' defaultIndex={[0]} allowMultiple>
            {
                matchedRoutes.map(route => {
                    return (<AccordionItem key={route.route}>
                        <h2>
                            <AccordionButton>
                                <Box flex='1' display='flex' justifyContent='space-between' mr={2}>
                                    <Box>
                                        <Text color='gray'>Route</Text>
                                        <Text fontSize='lg' fontWeight='bold'>{route.route}</Text>
                                    </Box>

                                    <Box>
                                        <Text color='gray'>Distance</Text>
                                        <Text fontSize='lg' fontWeight='bold'>{route.distance} KM</Text>
                                    </Box>

                                    <Box>
                                        <Text color='gray' display="flex">
                                            Price
                                            <Tooltip hasArrow shouldWrapChildren placement='top' label='per km 2.15 tk' bg='gray.300' color='black'>
                                                <Icon as={GoInfo} ml={1} pt={1} boxSize={5}/>
                                            </Tooltip>
                                        </Text>
                                        <Text fontSize='lg' fontWeight='bold'>{route.price} Tk</Text>
                                    </Box>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <fieldset className='citybus-fieldset'>
                                <legend className='citybus-legend'>Bus</legend>
                                <Box display='flex' flexWrap='wrap'>
                                    {route.buses.map((bus,idx) => {
                                        return (
                                            <Text key={idx} p={2} mt={1} mb={1} mr={1} bg='purple.500' color='white' rounded='md' fontSize='sm'>{bus}</Text>
                                        )
                                    })}
                                </Box>
                                {!route.buses.length ? <Text>No bus found for this route !</Text> : null}
                            </fieldset>
                            <fieldset className='citybus-fieldset'>
                                <legend className='citybus-legend'>Stops</legend>
                                <Box display='flex' flexWrap='wrap'>
                                    {route.stops.map((stop,idx) => {
                                        return (
                                            <Box display='flex' alignItems='center' key={idx}>
                                                <Text p={2} mt={1} mb={1} bg='gray.100' rounded='md' fontSize='sm' outline={stop === from || stop === to ? '2px dashed var(--chakra-colors-gray-500)' : 'none'}>{stop}</Text>
                                                {idx === route.stops.length - 1 ? null : <Icon as={RiArrowLeftRightLine} m={2}/>}
                                            </Box>
                                        )
                                    })}
                                </Box>
                            </fieldset>
                        </AccordionPanel>
                    </AccordionItem>);
                })
            }
        </Accordion>
    );
}

export default Results;