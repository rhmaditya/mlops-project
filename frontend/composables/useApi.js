/**
 * API Composable for YOLOv8 Food Calories API
 * Handles all API calls to the backend
 */

export const useApi = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://localhost:3000';

  /**
   * Predict image with YOLOv8
   */
  const predictImage = async (file) => {
    try {
      console.log('🔄 Sending request to:', `${apiBase}/api/predict`);
      console.log('📁 File size:', (file.size / 1024 / 1024).toFixed(2), 'MB');
      
      const formData = new FormData();
      formData.append('image', file);

      // Increase timeout to 120 seconds (2 minutes)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 120 seconds

      try {
        const response = await fetch(`${apiBase}/api/predict`, {
          method: 'POST',
          body: formData,
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          },
        });

        clearTimeout(timeoutId);

        console.log('📡 Response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Error response:', errorText);
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log('✅ Prediction result:', data);
        
        return data;

      } catch (fetchError) {
        clearTimeout(timeoutId);
        
        if (fetchError.name === 'AbortError') {
          throw new Error('Request timeout after 120 seconds. The model is taking too long to process the image.');
        }
        throw fetchError;
      }

    } catch (error) {
      console.error('❌ API Error:', error);
      throw error;
    }
  };

  return {
    predictImage
  };
};