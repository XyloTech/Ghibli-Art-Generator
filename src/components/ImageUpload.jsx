import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, VStack, Text, Icon, Image, Button } from '@chakra-ui/react';
import { FiUpload, FiImage } from 'react-icons/fi';
import { useAi } from '../context/AiContext';

const ImageUpload = ({ onImageUpload }) => {
  const { resetState } = useAi();
  const [uploadedImage, setUploadedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        onImageUpload(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });

  return (
    <VStack spacing={4} width="100%">
      <Box
        {...getRootProps()}
        w="100%"
        h="200px"
        border="2px dashed"
        borderColor={isDragActive ? 'teal.500' : 'gray.300'}
        borderRadius="lg"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg={isDragActive ? 'teal.50' : 'white'}
        transition="all 0.2s"
        cursor="pointer"
        _hover={{ borderColor: 'teal.500', bg: 'teal.50' }}
      >
        <input {...getInputProps()} />
        <VStack spacing={2}>
          <Icon
            as={uploadedImage ? FiImage : FiUpload}
            w={8}
            h={8}
            color={isDragActive ? 'teal.500' : 'gray.400'}
          />
          <Text color={isDragActive ? 'teal.500' : 'gray.500'} textAlign="center">
            {isDragActive
              ? 'Drop your image here'
              : 'Drag and drop your image here, or click to select'}
          </Text>
        </VStack>
      </Box>

      {uploadedImage && (
        <Box position="relative" width="100%">
          <Image
            src={uploadedImage}
            alt="Uploaded image"
            maxH="300px"
            width="100%"
            objectFit="contain"
            borderRadius="md"
          />
          <Button
            position="absolute"
            top={2}
            right={2}
            size="sm"
            colorScheme="red"
            onClick={() => {
              setUploadedImage(null);
              onImageUpload(null);
              resetState();
            }}
          >
            Remove
          </Button>
        </Box>
      )}
    </VStack>
  );
};

export default ImageUpload;