import { Meta } from '@/layouts/Meta';
import { WebApp } from '@/templates/WebApp';

const Index = () => {
  return (
    <WebApp
      meta={<Meta title="Collimator" description="Minesweeper" />}
      title="Minesweeper"
    >
      <div>Game here</div>
    </WebApp>
  );
};

export default Index;
