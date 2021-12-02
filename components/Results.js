import {
    Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Icon, Text
} from '@chakra-ui/react';
import { RiArrowLeftRightLine } from 'react-icons/ri';

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
                            <Box display='flex' flexWrap='wrap'>
                                {route.stops.map((stop,idx) => {
                                    return (
                                        <Box display='flex' alignItems='center' key={idx}>
                                            <Text p={2} mt={1} mb={1} bg='gray.100' rounded='md' fontSize='sm'>{stop}</Text>
                                            {idx === route.stops.length - 1 ? null : <Icon as={RiArrowLeftRightLine} m={2}/>}
                                        </Box>
                                    )
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