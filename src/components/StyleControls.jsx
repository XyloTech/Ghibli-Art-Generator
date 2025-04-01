import { useState } from 'react';
import { VStack, HStack, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, Select, FormControl, FormLabel, Button } from '@chakra-ui/react';
import { useAi } from '../context/AiContext';

const StyleControls = ({ uploadedImage }) => {
  const { processImageWithAi, isProcessing, error } = useAi();
  const [styleOptions, setStyleOptions] = useState({
    intensity: 60,
    style: '',
    palette: '',
    detailLevel: 75
  });

  const handleStyleChange = (field, value) => {
    setStyleOptions(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerate = () => {
    if (uploadedImage) {
      processImageWithAi(uploadedImage, styleOptions);
    }
  };

  return (
    <VStack spacing={4} width="100%" bg="gray.50" p={4} borderRadius="md">
      <FormControl>
        <FormLabel>Style Intensity</FormLabel>
        <Slider
          value={styleOptions.intensity}
          onChange={(value) => handleStyleChange('intensity', value)}
          min={0}
          max={100}
          step={1}
        >
          <SliderTrack>
            <SliderFilledTrack bg="teal.500" />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
      </FormControl>

      <FormControl>
        <FormLabel>Ghibli Style</FormLabel>
        <Select
          value={styleOptions.style}
          onChange={(e) => handleStyleChange('style', e.target.value)}
          placeholder="Select style"
          bg="white"
        >
          <option value="spirited-away">Spirited Away</option>
          <option value="totoro">My Neighbor Totoro</option>
          <option value="howl">Howl's Moving Castle</option>
          <option value="mononoke">Princess Mononoke</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Color Palette</FormLabel>
        <Select
          value={styleOptions.palette}
          onChange={(e) => handleStyleChange('palette', e.target.value)}
          placeholder="Select palette"
          bg="white"
        >
          <option value="natural">Natural</option>
          <option value="vibrant">Vibrant</option>
          <option value="pastel">Pastel</option>
          <option value="dramatic">Dramatic</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Detail Level</FormLabel>
        <Slider
          value={styleOptions.detailLevel}
          onChange={(value) => handleStyleChange('detailLevel', value)}
          min={0}
          max={100}
          step={1}
        >
          <SliderTrack>
            <SliderFilledTrack bg="teal.500" />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
      </FormControl>

      {error && (
        <Text color="red.500" fontSize="sm">
          {error}
        </Text>
      )}

      <Button
        colorScheme="teal"
        width="100%"
        onClick={handleGenerate}
        isLoading={isProcessing}
        isDisabled={!uploadedImage || isProcessing}
      >
        Generate Artwork
      </Button>
    </VStack>
  );
};

export default StyleControls;