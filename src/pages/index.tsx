import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title="Marco Experiences"
          description="Marco Experiences page description"
        />
      }
    >
      <h2 className="text-2xl font-bold">Marco Experiences Sandbox</h2>
      <p>Paragraph text</p>
      <h3 className="text-lg font-semibold">H3 heading</h3>
      <p>Paragraph text</p>
    </Main>
  );
};

export default Index;
