import Button from 'react-bootstrap/Button';

import { Meta } from '@/layouts/Meta';
import { WebApp } from '@/templates/WebApp';

const Index = () => {
  return (
    <WebApp
      meta={
        <Meta
          title="Marco Experiences"
          description="Marco Experiences page description"
        />
      }
      title="Marco Experiences Sandbox"
    >
      <p>Paragraph text</p>
      <Button variant="primary">Primary</Button>
      <h3 className="h2">H3 heading</h3>
      <p>Paragraph text</p>
    </WebApp>
  );
};

export default Index;
