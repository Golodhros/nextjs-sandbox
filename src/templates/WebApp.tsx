// import Link from "next/link";
import type { ReactNode } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

type IWebAppProps = {
  meta: ReactNode;
  title: ReactNode;
  children: ReactNode;
};

const WebApp = (props: IWebAppProps) => (
  <Container>
    {props.meta}
    <Row>
      <Col>
        <header className="">
          <h1 className="h1">{props.title}</h1>
        </header>
      </Col>
    </Row>
    <Row>
      <Col>
        <main className="p">{props.children}</main>
      </Col>
    </Row>
  </Container>
);

export { WebApp };
