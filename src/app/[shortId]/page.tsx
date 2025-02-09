import { Metadata } from 'next';
import ClientRedirectPage from './client';

interface PageProps {
  params: { shortId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export const metadata: Metadata = {
  title: 'Verification Required',
  description: 'Please verify that you are human',
};

export default function Page({ params }: PageProps) {
  return <ClientRedirectPage shortId={params.shortId} />;
} 