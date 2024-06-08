'use client';
import { useRouter} from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from './button';
import Link from 'next/link';

export default function TopNav() {
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;

  const handleClick = () => {
    router.push(`/dashboard/${userId}/pdf-chat`);
  };


  return (
<div>
      <Button onClick={handleClick}>PDF Chat</Button>
      <Button><Link href={`/dashboard/${userId}/pdf-chat`}>PDF Chat</Link>
      </Button>
      </div>

  );
}