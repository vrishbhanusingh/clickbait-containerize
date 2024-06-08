'use client'

import { useRouter } from 'next/navigation';
import React from 'react';
import {useUser} from '@clerk/nextjs'
type GoToDashButtonProps = {
  userId: string;
};

const GoToDashButton: React.FC<GoToDashButtonProps> = () => {
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;
  const handleClick = () => {
    router.push(`dashboard/${userId}`);
  };

  return (
    <button onClick={handleClick}>
      Go to Dashboard
    </button>
  );
};

export default GoToDashButton;