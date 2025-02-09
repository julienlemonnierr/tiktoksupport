'use client';

import { useEffect, useState } from 'react';

interface PageProps {
  params: {
    shortId: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

export default function RedirectPage({ params }: PageProps) {
  const [progress, setProgress] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationId] = useState(() => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 10);
    return `${timestamp}${random}`;
  });

  const startVerification = () => {
    setIsVerifying(true);
    setProgress(0);
    
    const startTime = Date.now();
    const duration = 2000; // 2 seconds total

    const animate = () => {
      const now = Date.now();
      const timePassed = now - startTime;
      const progress = Math.min((timePassed / duration) * 100, 100);
      
      setProgress(progress);
      
      if (progress < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(redirectToOriginalUrl, 500);
      }
    };

    requestAnimationFrame(animate);
  };

  const redirectToOriginalUrl = async () => {
    try {
      const response = await fetch(`/api/redirect/${params.shortId}`);
      const data = await response.json();

      if (response.ok && data.originalUrl) {
        window.location.replace(data.originalUrl);
      } else {
        window.location.replace('/');
      }
    } catch (error) {
      console.error('Error:', error);
      window.location.replace('/');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => startVerification(), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F6F7]">
      <div className="w-full max-w-[480px] bg-white rounded shadow-sm p-8">
        <div className="flex flex-col items-center gap-4 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <div className="text-[22px] text-[#111827] font-medium">Verify that you are human</div>
          <div className="text-[14px] text-[#6B7280]">Continue by completing this quick verification</div>
        </div>

        {!isVerifying ? (
          <div className="space-y-4">
            <div 
              onClick={startVerification}
              className="w-full h-[48px] bg-[#00A550] hover:bg-[#008E45] text-white rounded cursor-pointer flex items-center justify-center text-[15px] font-medium transition-colors duration-200"
            >
              I am not a robot
            </div>
            <div className="flex items-center justify-between px-1">
              <div className="text-[12px] text-[#6B7280] font-mono">{verificationId}</div>
              <button className="flex items-center gap-2 text-[12px] text-[#6B7280] hover:text-[#111827] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span>Audio</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full bg-[#EAEAEA] rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-[#00A550] h-1.5 rounded-full transform origin-left transition-transform duration-100"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
        )}
      </div>
    </div>
  );
} 