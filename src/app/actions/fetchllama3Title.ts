// export async function fetchFromNgrokAPI(prompt:string) {
//     const url = 'https://72d0-34-171-145-140.ngrok-free.app/generate';
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ input: prompt })
//     });
  
//     if (!response.ok) {
//       throw new Error('Failed to fetch data from ngrok API');
//     }
  
//     const data = await response.json();
//     return data.output;
//   }

  export async function fetchFromNgrokAPI(context, abstract) {
    const url = "https://f06c-35-193-135-122.ngrok-free.app/generate";
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