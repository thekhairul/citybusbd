import {
    Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text
} from '@chakra-ui/react';

function Results({matchedRoutes}) {
    return (
        <Accordion my={10} bg='white' rounded='lg' boxShadow='lg' allowMultiple>
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
                                        <Text color='gray'>Price</Text>
                                        <Text fontSize='lg' fontWeight='bold'>{route.price} Tk</Text>
                                    </Box>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Box display='flex' flexWrap='wrap' rounded='lg' overflow='hidden'>
                                {route.stops.map((stop,idx) => {
                                    return <Box flexGrow='1' p={2} bg='purple.500' color='white' rounded='lg' border='2px solid' key={idx}>{stop}</Box>
                                })}
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>);
                })
            }
        </Accordion>
    );
}

export default Results;