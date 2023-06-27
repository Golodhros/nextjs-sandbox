// import Link from "next/link";
import type { ReactNode } from 'react';

type IWebAppProps = {
  meta: ReactNode;
  title: ReactNode;
  children: ReactNode;
};

const WebApp = (props: IWebAppProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}

    <div className="mx-auto max-w-screen-md">
      <header className="">
        <h1 className="text-3xl font-bold text-gray-900">{props.title}</h1>
      </header>
      <main className="content py-5 text-xl">{props.children}</main>
    </div>
  </div>
);

export { WebApp };
