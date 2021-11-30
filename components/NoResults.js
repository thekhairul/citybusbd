import { Box, Text } from '@chakra-ui/layout';
import Image from 'next/image';

function NoResults() {
    return (
        <Box my={10} bg='white' rounded='lg' boxShadow='lg' minHeight='md' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <Image src='/not-found.jpg' alt='no route matches' width={300} height={300}></Image>
            <Text fontSize='md' fontWeight='bold'>No matches found!</Text>
        </Box>
    )
}

export default NoResults;