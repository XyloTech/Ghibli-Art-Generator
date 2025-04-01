// AI Service for image processing

// Configuration for the AI service
const AI_API_ENDPOINT = 'https://api.replicate.com/v1/predictions';
const AI_API_KEY = import.meta.env.VITE_REPLICATE_API_KEY;

// Error types
export const AI_ERROR_TYPES = {
  API_KEY_MISSING: 'xai-k8nVWOVX5CliCJi5EpysBuHksUJFVxnZ3AvRtvxKBAq6nhtYzqVqRQFBcIz6DRO9C73L4QRsPzZFeYY3',
  NETWORK_ERROR: 'NETWORK_ERROR',
  INVALID_RESPONSE: 'INVALID_RESPONSE',
  PROCESSING_ERROR: 'PROCESSING_ERROR'
};

// Process image with AI
export const processImage = async (imageData, styleOptions) => {
  if (!AI_API_KEY) {
    throw new Error(AI_ERROR_TYPES.API_KEY_MISSING);
  }

  try {
    const response = await fetch(AI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${AI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'v1',
        input: {
          image: imageData,
          style: styleOptions.style,
          intensity: styleOptions.intensity / 100,
          palette: styleOptions.palette,
          detail_level: styleOptions.detailLevel / 100
        }
      })
    });

    if (!response.ok) {
      throw new Error(AI_ERROR_TYPES.NETWORK_ERROR);
    }

    const data = await response.json();
    
    if (!data || !data.output) {
      throw new Error(AI_ERROR_TYPES.INVALID_RESPONSE);
    }

    return data.output;
  } catch (error) {
    console.error('AI Processing Error:', error);
    throw new Error(AI_ERROR_TYPES.PROCESSING_ERROR);
  }
};