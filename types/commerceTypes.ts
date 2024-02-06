export interface ChargeRequestBody {
  local_price: {
    amount: string;
    currency: string;
  };
  metadata: {
    walletAddress: string | undefined;
  };
  pricing_type: 'fixed_price' | 'no_price';
  name: string;
  description: string;
  redirect_url: string;
}
