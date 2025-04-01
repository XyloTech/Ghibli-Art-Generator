import { Box, Button, VStack, Image, Spinner, Text, HStack } from '@chakra-ui/react';
import { FiDownload, FiShare2 } from 'react-icons/fi';
import { useAi } from '../context/AiContext';

const ImagePreview = () => {
  const { isProcessing, generatedImage, error } = useAi();

  const handleDownload = () => {
    // Implementation for downloading the generated image
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'ghibli-art.png';
      link.click();
    }
  };

  const handleShare = () => {
    // Implementation for sharing the generated image
    if (generatedImage && navigator.share) {
      navigator.share({
        title: 'My Ghibli Art',
        text: 'Check out this Ghibli-style artwork I created!',
        url: generatedImage
      }).catch(console.error);
    }
  };

  return (
    <VStack spacing={4} width="100%">
      <Box
        width="100%"
        height="400px"
        borderRadius="lg"
        border="2px"
        borderColor="gray.200"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        position="relative"
        bg="gray.50"
      >
        {isProcessing ? (
          <VStack spacing={3}>
            <Spinner size="xl" color="teal.500" thickness="4px" />
            <Text color="gray.500">Generating your Ghibli artwork...</Text>
          </VStack>
        ) : generatedImage ? (
          <Image
            src={generatedImage}
            alt="Generated Ghibli art"
            objectFit="contain"
            width="100%"
            height="100%"
          />
        ) : (
          <Text color="gray.500">Your generated artwork will appear here</Text>
        )}
      </Box>

      {generatedImage && (
        <HStack spacing={4} width="100%" justify="center">
          <Button
            leftIcon={<FiDownload />}
            colorScheme="teal"
            onClick={handleDownload}
          >
            Download
          </Button>
          <Button
            leftIcon={<FiShare2 />}
            colorScheme="teal"
            variant="outline"
            onClick={handleShare}
          >
            Share
          </Button>
        </HStack>
      )}
    </VStack>
  );
};

export default ImagePreview;