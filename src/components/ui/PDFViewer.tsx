// import React from "react";

// type Props = { pdf_url: string };

// const PDFViewer = ({ pdf_url }: Props) => {
//   return (
//     <iframe
//       src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`}
//       className="min-w-[130mm] min-h-[177mm]"
//     ></iframe>
//   );
// };

// export default PDFViewer;

import React from "react";

type Props = { pdf_url: string };

const PDFViewer = ({ pdf_url }: Props) => {
  return (
    <iframe
      src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`}
      className="w-full h-full pl-10 rounded-xl scrollbar-hide"
    ></iframe>
  );
};

export default PDFViewer;
