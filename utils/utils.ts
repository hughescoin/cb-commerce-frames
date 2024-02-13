import { ChargeRequestBody } from '../types/commerceTypes';
import { FrameRequest, getFrameAccountAddress, getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest } from 'next/server';
export const NEXT_PUBLIC_URL = 'cb-commerce-frames-tau.vercel.app';
export const apiKey = process.env.API_KEY;
export const apiVersion = process.env.API_VERSION;
export const commerceApiUrl = 'https://api.commerce.coinbase.com/charges';
export const PRODUCT_PRICE_USD = '0.9';
export const ITEM_DESCRIPTION = 'The best skis in the world ever ever';
export const ITEM_TITLE = 'Armada ARV 100 Skis';
export const REDIRECT_URL = ''; //optional
export const IMAGE_NAME = 'ski.png';

export const createRequestHeaders = (): Headers => {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  headers.set('X-CC-Api-Key', `888323c6-9439-4838-ac53-07e38d9470b2`);
  headers.set('X-CC-Version', `${apiVersion}`);
  return headers;
};

const requestHeaders = createRequestHeaders();
export async function createCharge(chargeData: ChargeRequestBody): Promise<any> {
  try {
    const response = await fetch(commerceApiUrl, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(chargeData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log('Response before parsing:', response);
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error('Failed to create charge:', error);
    throw new Error('Failed to create charge: ' + error);
  }
}

export function buildRequestBody(address: string | undefined): ChargeRequestBody {
  const requestBody: ChargeRequestBody = {
    local_price: {
      amount: PRODUCT_PRICE_USD,
      currency: 'USD',
    },
    metadata: {
      walletAddress: address,
    },
    pricing_type: 'fixed_price',
    name: ITEM_TITLE,
    description: ITEM_DESCRIPTION,
    redirect_url: REDIRECT_URL,
  };
  return requestBody;
}

export async function getMetaData(req: NextRequest) {
  let accountAddress: string | undefined = '';
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body);
  if (isValid) {
    try {
      accountAddress = await getFrameAccountAddress(message, {
        NEYNAR_API_KEY: 'NEYNAR_API_DOCS',
      });
      return accountAddress;
    } catch (err) {
      console.error(err);
    }
  }
}
