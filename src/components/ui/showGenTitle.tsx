'use client';
import React from 'react';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { GeneratedTitleComponent } from '../TitleabstractComponent';
type Props = { paperId: number };

const ShowGenTitle = ({ paperId}: Props) => {
  return (
    <div className="w-full h-full">
        <GeneratedTitleComponent paperId = {paperId} />
    </div>
  );
};

export default ShowGenTitle;