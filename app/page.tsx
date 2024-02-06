import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL, IMAGE_NAME, ITEM_DESCRIPTION, ITEM_TITLE } from '../utils/utils';

const frameMetadata = getFrameMetadata({
  buttons: [{ label: 'Buy', action: 'post_redirect' }],
  image: `${NEXT_PUBLIC_URL}/${IMAGE_NAME}`,
  post_url: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: ITEM_TITLE,
  description: ITEM_DESCRIPTION,
  openGraph: {
    title: ITEM_TITLE,
    description: ITEM_DESCRIPTION,
    images: [NEXT_PUBLIC_URL],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <img src={`/${IMAGE_NAME}`} />
    </>
  );
}
