import { NextResponse } from 'next/server';
import { analysisCache } from '@/components/analysis-cache';

const CACHE_LIFETIME_MS = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

export async function POST(request: Request) {
  try {
    const { id, data } = await request.json();

    if (!id || !data) {
      return NextResponse.json({ success: false, message: 'Missing id or data' }, { status: 400 });
    }

    // Store data with a timestamp
    analysisCache.set(id, { 
      data, 
      timestamp: Date.now() 
    });

    return NextResponse.json({ success: true, message: 'Data saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving analysis data:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Missing analysis ID' }, { status: 400 });
    }

    const cachedEntry = analysisCache.get(id);

    if (!cachedEntry) {
      return NextResponse.json({ success: false, message: 'Analysis data not found' }, { status: 404 });
    }

    // Check if data has expired (6 hours)
    if (Date.now() - cachedEntry.timestamp > CACHE_LIFETIME_MS) {
      analysisCache.delete(id); // Remove expired data
      return NextResponse.json({ success: false, message: 'Analysis data expired' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: cachedEntry.data }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving analysis data:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}