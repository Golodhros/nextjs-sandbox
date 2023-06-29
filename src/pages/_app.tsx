import '../styles/global.scss';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
