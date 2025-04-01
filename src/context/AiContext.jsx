import React, { createContext, useContext, useState } from 'react';
import { processImage, AI_ERROR_TYPES } from '../services/aiService';

const AiContext = createContext();

export const useAi = () => {
  const context = useContext(AiContext);
  if (!context) {
    throw new Error('useAi must be used within an AiProvider');
  }
  return context;
};

export const AiProvider = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);

  const processImageWithAi = async (imageData, styleOptions) => {
    setIsProcessing(true);
    setError(null);

    try {
      const result = await processImage(imageData, styleOptions);
      setGeneratedImage(result);
    } catch (error) {
      let errorMessage = 'An unexpected error occurred';
      
      switch (error.message) {
        case AI_ERROR_TYPES.API_KEY_MISSING:
          errorMessage = 'API key is missing. Please check your environment configuration.';
          break;
        case AI_ERROR_TYPES.NETWORK_ERROR:
          errorMessage = 'Network error occurred. Please check your internet connection.';
          break;
        case AI_ERROR_TYPES.INVALID_RESPONSE:
          errorMessage = 'Invalid response from AI service.';
          break;
        case AI_ERROR_TYPES.PROCESSING_ERROR:
          errorMessage = 'Error processing the image.';
          break;
      }
      
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetState = () => {
    setGeneratedImage(null);
    setError(null);
    setIsProcessing(false);
  };

  return (
    <AiContext.Provider
      value={{
        isProcessing,
        error,
        generatedImage,
        processImageWithAi,
        resetState
      }}
    >
      {children}
    </AiContext.Provider>
  );
};