// import Link from "next/link";
import type { ReactNode } from 'react';

type IWebAppProps = {
  meta: ReactNode;
  title: ReactNode;
  children: ReactNode;
};

const WebApp = (props: IWebAppProps) => (
  <div className="container">
    {props.meta}
    <header className="header">
      <h1 className="h1">{props.title}</h1>
    </header>
    <main>{props.children}</main>
  </div>
);

export { WebApp };
