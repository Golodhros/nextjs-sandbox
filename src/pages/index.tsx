import { useEffect, useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { WebApp } from '@/templates/WebApp';

import { CategoryFilter } from '../components/categoryFilter';
import { Reel } from '../components/reel';

const API_ENDPOINT = '/api/marco';

// TODO
// - Handle loading state
// - Handle error state
// - Fix image aspect ratio
// - Improve performance with observer

const Index = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((parsedData) => {
        setData(parsedData.data.categories);
      });
  }, []);

  console.log('data', data);

  return (
    <WebApp
      meta={
        <Meta
          title="Marco Experiences"
          description="Marco Experiences page description"
        />
      }
      title="Explore Experiences"
    >
      <CategoryFilter categories={data} />
      {data.length
        ? data.map(({ id, title, items }) => {
            return <Reel key={id} title={title} experiences={items} />;
          })
        : null}
    </WebApp>
  );
};

export default Index;
