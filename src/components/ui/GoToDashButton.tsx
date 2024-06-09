'use client'

import { useRouter } from 'next/navigation';
import React from 'react';
import {useUser} from '@clerk/nextjs'
import { Button } from '~/components/ui/button';
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
    <Button onClick={handleClick}>

      Go to Dashboard
    </Button>
  );
};

export default GoToDashButton;