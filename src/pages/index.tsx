import Button from 'react-bootstrap/Button';

import { Meta } from '@/layouts/Meta';
import { WebApp } from '@/templates/WebApp';

const Index = () => {
  return (
    <WebApp
      meta={
        <Meta
          title="All In Bites"
          description="All In Bites page description"
        />
      }
      title="All In Bites Sandbox"
    >
      <p>Paragraph text</p>
      <Button variant="primary">Primary</Button>
      <h3 className="h2">H3 heading</h3>
      <p>Paragraph text</p>
    </WebApp>
  );
};

export default Index;
