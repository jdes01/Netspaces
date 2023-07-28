import { useSession, signIn } from 'next-auth/react';

import { Landing } from '@netspaces/ui';
import { Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export function Index() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'authenticated') router.push('/workspaces');

  return (
    <>
      <Landing signIn={signIn}></Landing>
    </>
  );
}

export default Index;
