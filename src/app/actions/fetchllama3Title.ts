export async function fetchFromNgrokAPI(prompt:string) {
    const url = 'https://72d0-34-171-145-140.ngrok-free.app/generate';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input: prompt })
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data from ngrok API');
    }
  
    const data = await response.json();
    return data.output;
  }