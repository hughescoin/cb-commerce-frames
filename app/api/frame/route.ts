import { NextRequest, NextResponse } from 'next/server';

import { createCharge, buildRequestBody, getMetaData } from '../../../utils/utils';

async function getResponse(req: NextRequest, hostedUrl: string): Promise<NextResponse> {
  return NextResponse.redirect(hostedUrl, { status: 302 });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const addr = await getMetaData(req);
    const body = buildRequestBody(addr);
    const responseData = await createCharge(body);
    const hostedUrl = responseData.data.hosted_url;
    console.log({
      charge: responseData.data.id,
      user: addr,
    });
    return getResponse(req, hostedUrl);
  } catch (error) {
    console.error('Error in POST function:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to create charge' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const dynamic = 'force-dynamic';
