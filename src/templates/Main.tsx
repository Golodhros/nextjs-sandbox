// import Link from "next/link";
import type { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  title: string;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}

    <div className="mx-auto max-w-screen-md">
      <header className="border-b border-gray-300">
        <div className="py-5">
          <h1 className="text-3xl font-bold text-gray-900">{props.title}</h1>
        </div>
      </header>

      <main className="content py-5 text-xl">{props.children}</main>

      {/* <footer className="border-t border-gray-300 py-8 text-center text-sm"></footer> */}
    </div>
  </div>
);

export { Main };
