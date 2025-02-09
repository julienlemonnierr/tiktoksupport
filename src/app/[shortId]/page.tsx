import { Metadata } from 'next';
import ClientRedirectPage from './client';

interface PageProps {
  params: {
    shortId: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

export const metadata: Metadata = {
  title: 'Verification Required',
  description: 'Please verify that you are human',
};

export default async function Page(props: PageProps) {
  return <ClientRedirectPage params={props.params} />;
} 