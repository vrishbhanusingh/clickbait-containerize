'use server';

export async function fetchFromNgrokAPI(context, abstract) {
    const url = "https://9c63-34-136-112-53.ngrok-free.app/generate";
    const data = { context, abstract };
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
      return result;
    } catch (error) {
      console.error('Error making API request:', error);
      throw error;
    }
  };