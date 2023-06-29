// import Link from "next/link";
import Link from 'next/link';
import type { ReactNode } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { Logo } from '../components/logo';

type IWebAppProps = {
  meta: ReactNode;
  title: ReactNode;
  children: ReactNode;
};

const WebApp = (props: IWebAppProps) => (
  <>
    <div className="global-header">
      <span className="logo">
        <Link href="/">
          <Logo />
          <span>Marco</span>
        </Link>
      </span>
    </div>
    <Container>
      {props.meta}
      <Row>
        <Col>
          <header className="header">
            <h1 className="h1">{props.title}</h1>
          </header>
        </Col>
      </Row>
      <Row>
        <Col>
          <main>{props.children}</main>
        </Col>
      </Row>
    </Container>
  </>
);

export { WebApp };
