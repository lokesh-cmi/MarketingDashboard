'use client';

import { useState } from 'react';

export default function CacheTestPage() {
  const [linkedInResult, setLinkedInResult] = useState<any>(null);
  const [googleAdsResult, setGoogleAdsResult] = useState<any>(null);
  const [hubspotResult, setHubspotResult] = useState<any>(null);
  const [googleAnalyticsResult, setGoogleAnalyticsResult] = useState<any>(null);
  const [searchConsoleResult, setSearchConsoleResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testCache = async () => {
    setLoading(true);
    
    // Test LinkedIn Ads
    const linkedIn1 = await fetch('/api/linkedin-ads');
    const li1Data = await linkedIn1.json();
    const li1Time = Date.now();
    
    // Wait 100ms
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const linkedIn2 = await fetch('/api/linkedin-ads');
    const li2Data = await linkedIn2.json();
    const li2Time = Date.now();
    
    setLinkedInResult({
      firstCall: { source: li1Data.source, time: 0 },
      secondCall: { source: li2Data.source, time: li2Time - li1Time },
    });

    // Test Google Ads
    const gads1 = await fetch('/api/google-ads');
    const gads1Data = await gads1.json();
    const gads1Time = Date.now();
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const gads2 = await fetch('/api/google-ads');
    const gads2Data = await gads2.json();
    const gads2Time = Date.now();
    
    setGoogleAdsResult({
      firstCall: { source: gads1Data.source, time: 0 },
      secondCall: { source: gads2Data.source, time: gads2Time - gads1Time },
    });

    // Test HubSpot
    const hs1 = await fetch('/api/hubspot');
    const hs1Data = await hs1.json();
    const hs1Time = Date.now();
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const hs2 = await fetch('/api/hubspot');
    const hs2Data = await hs2.json();
    const hs2Time = Date.now();
    
    setHubspotResult({
      firstCall: { source: hs1Data.source, time: 0 },
      secondCall: { source: hs2Data.source, time: hs2Time - hs1Time },
    });

    // Test Google Analytics
    const ga1 = await fetch('/api/google-analytics');
    const gaData1 = await ga1.json();
    const gaTime1 = Date.now();
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const ga2 = await fetch('/api/google-analytics');
    const gaData2 = await ga2.json();
    const gaTime2 = Date.now();
    
    setGoogleAnalyticsResult({
      firstCall: { source: gaData1.source, time: 0 },
      secondCall: { source: gaData2.source, time: gaTime2 - gaTime1 },
    });

    // Test Search Console
    const sc1 = await fetch('/api/search-console');
    const scData1 = await sc1.json();
    const scTime1 = Date.now();
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const sc2 = await fetch('/api/search-console');
    const scData2 = await sc2.json();
    const scTime2 = Date.now();
    
    setSearchConsoleResult({
      firstCall: { source: scData1.source, time: 0 },
      secondCall: { source: scData2.source, time: scTime2 - scTime1 },
    });

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Cache Test</h1>
        
        <button
          onClick={testCache}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 mb-8"
        >
          {loading ? 'Testing...' : 'Run Cache Test'}
        </button>

        {linkedInResult && (
          <div className="bg-white rounded-lg p-6 mb-4 border-2 border-gray-200">
            <h2 className="text-xl font-semibold mb-4">LinkedIn Ads API</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>First Call:</span>
                <span className="font-mono">
                  Source: <span className={linkedInResult.firstCall.source === 'database' ? 'text-orange-600' : 'text-green-600'}>
                    {linkedInResult.firstCall.source}
                  </span>
                </span>
              </div>
              <div className="flex justify-between">
                <span>Second Call:</span>
                <span className="font-mono">
                  Source: <span className={linkedInResult.secondCall.source === 'database' ? 'text-orange-600' : 'text-green-600'}>
                    {linkedInResult.secondCall.source}
                  </span> (took {linkedInResult.secondCall.time}ms)
                </span>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded">
                {linkedInResult.secondCall.source === 'cache' ? (
                  <span className="text-green-600 font-semibold">✓ Cache Working!</span>
                ) : (
                  <span className="text-red-600 font-semibold">✗ Cache Not Working</span>
                )}
              </div>
            </div>
          </div>
        )}

        {googleAdsResult && (
          <div className="bg-white rounded-lg p-6 mb-4 border-2 border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Google Ads API</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>First Call:</span>
                <span className="font-mono">
                  Source: <span className={googleAdsResult.firstCall.source === 'database' ? 'text-orange-600' : 'text-green-600'}>
                    {googleAdsResult.firstCall.source}
                  </span>
                </span>
              </div>
              <div className="flex justify-between">
                <span>Second Call:</span>
                <span className="font-mono">
                  Source: <span className={googleAdsResult.secondCall.source === 'database' ? 'text-orange-600' : 'text-green-600'}>
                    {googleAdsResult.secondCall.source}
                  </span> (took {googleAdsResult.secondCall.time}ms)
                </span>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded">
                {googleAdsResult.secondCall.source === 'cache' ? (
                  <span className="text-green-600 font-semibold">✓ Cache Working!</span>
                ) : (
                  <span className="text-red-600 font-semibold">✗ Cache Not Working</span>
                )}
              </div>
            </div>
          </div>
        )}

        {hubspotResult && (
          <div className="bg-white rounded-lg p-6 mb-4 border-2 border-gray-200">
            <h2 className="text-xl font-semibold mb-4">HubSpot API</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>First Call:</span>
                <span className="font-mono">
                  Source: <span className={hubspotResult.firstCall.source === 'database' ? 'text-orange-600' : 'text-green-600'}>
                    {hubspotResult.firstCall.source}
                  </span>
                </span>
              </div>
              <div className="flex justify-between">
                <span>Second Call:</span>
                <span className="font-mono">
                  Source: <span className={hubspotResult.secondCall.source === 'database' ? 'text-orange-600' : 'text-green-600'}>
                    {hubspotResult.secondCall.source}
                  </span> (took {hubspotResult.secondCall.time}ms)
                </span>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded">
                {hubspotResult.secondCall.source === 'cache' ? (
                  <span className="text-green-600 font-semibold">✓ Cache Working!</span>
                ) : (
                  <span className="text-red-600 font-semibold">✗ Cache Not Working</span>
                )}
              </div>
            </div>
          </div>
        )}

        {googleAnalyticsResult && (
          <div className="bg-white rounded-lg p-6 mb-4 border-2 border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Google Analytics API</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>First Call:</span>
                <span className="font-mono">
                  Source: <span className={googleAnalyticsResult.firstCall.source === 'database' ? 'text-orange-600' : 'text-green-600'}>
                    {googleAnalyticsResult.firstCall.source}
                  </span>
                </span>
              </div>
              <div className="flex justify-between">
                <span>Second Call:</span>
                <span className="font-mono">
                  Source: <span className={googleAnalyticsResult.secondCall.source === 'database' ? 'text-orange-600' : 'text-green-600'}>
                    {googleAnalyticsResult.secondCall.source}
                  </span> (took {googleAnalyticsResult.secondCall.time}ms)
                </span>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded">
                {googleAnalyticsResult.secondCall.source === 'cache' ? (
                  <span className="text-green-600 font-semibold">✓ Cache Working!</span>
                ) : (
                  <span className="text-red-600 font-semibold">✗ Cache Not Working</span>
                )}
              </div>
            </div>
          </div>
        )}

        {searchConsoleResult && (
          <div className="bg-white rounded-lg p-6 mb-4 border-2 border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Search Console API</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>First Call:</span>
                <span className="font-mono">
                  Source: <span className={searchConsoleResult.firstCall.source === 'database' ? 'text-orange-600' : 'text-green-600'}>
                    {searchConsoleResult.firstCall.source}
                  </span>
                </span>
              </div>
              <div className="flex justify-between">
                <span>Second Call:</span>
                <span className="font-mono">
                  Source: <span className={searchConsoleResult.secondCall.source === 'database' ? 'text-orange-600' : 'text-green-600'}>
                    {searchConsoleResult.secondCall.source}
                  </span> (took {searchConsoleResult.secondCall.time}ms)
                </span>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded">
                {searchConsoleResult.secondCall.source === 'cache' ? (
                  <span className="text-green-600 font-semibold">✓ Cache Working!</span>
                ) : (
                  <span className="text-red-600 font-semibold">✗ Cache Not Working</span>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
          <h3 className="font-semibold mb-2">How to Test:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Click "Run Cache Test" button</li>
            <li>First call fetches from database (source: "database")</li>
            <li>Second call should fetch from cache (source: "cache")</li>
            <li>If both show "cache", reload the page first to clear browser cache</li>
          </ol>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <h3 className="font-semibold mb-2">Cache TTLs:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>LinkedIn Ads: 1 hour</li>
            <li>Google Ads: 1 hour</li>
            <li>HubSpot: 2 hours</li>
            <li>Google Analytics: 1 hour</li>
            <li>Search Console: 2 hours</li>
            <li>SEMrush Keywords: 6 hours</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
