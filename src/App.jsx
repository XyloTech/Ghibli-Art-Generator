import { ChakraProvider, Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import ImageUpload from './components/ImageUpload';
import StyleControls from './components/StyleControls';
import ImagePreview from './components/ImagePreview';

import { useState } from 'react';
import { AiProvider } from './context/AiContext';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);

  return (
    <ChakraProvider>
      <AiProvider>
        <Box minH="100vh" bg="gray.50" py={8}>
          <Container maxW="container.lg">
            <VStack spacing={8} align="stretch">
              <Box textAlign="center">
                <Heading as="h1" size="2xl" color="teal.600" mb={2}>
                  Ghibli Art Generator
                </Heading>
                <Text color="gray.600">
                  Transform your images into beautiful Ghibli-inspired artwork
                </Text>
              </Box>
              
              <Box bg="white" p={6} borderRadius="lg" shadow="md">
                <VStack spacing={6}>
                  <ImageUpload onImageUpload={setUploadedImage} />
                  <StyleControls uploadedImage={uploadedImage} />
                  <ImagePreview />
                </VStack>
              </Box>
            </VStack>
          </Container>
        </Box>
      </AiProvider>
    </ChakraProvider>
  );
}

export default App;