import { Metadata } from 'next';
import ClientRedirectPage from './client';

type Props = {
  params: Promise<{ shortId: string }>;
};

export const metadata: Metadata = {
  title: 'Verification Required',
  description: 'Please verify that you are human',
};

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  return <ClientRedirectPage shortId={resolvedParams.shortId} />;
} 