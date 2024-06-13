export const speechToText = (blob: Blob, callback: (data: string) => void) => {
    const reader = new FileReader();
    let base64Data: string | undefined;
  
    reader.onload = () => {
      base64Data =
        typeof reader.result === "string" ? reader.result.split(",")[1] : "";
  
      callback(base64Data || "");
    };
  
    reader.readAsDataURL(blob);
  };