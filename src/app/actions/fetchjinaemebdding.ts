'use server';

export async function fetchJinaEmbedding(adsQuery) {
    const url = "https://9401-34-147-124-190.ngrok-free.app/encode";
    const data = { "input_string": adsQuery };
    const headers = {
      "Content-Type": "application/json",
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),

      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(result.result)
      return result.result;
    } catch (error) {
      console.error('Error making API request:', error);
      throw error;
    }
  };