import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { WebApp } from '@/templates/WebApp';

import { CategoryFilter } from '../../components/categoryFilter';
import { Reel } from '../../components/reel';

const API_ENDPOINT = '/api/marco';

const Category = () => {
  const [data, setData] = useState([]);
  const { query } = useRouter();

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((parsedData) => {
        setData(parsedData.data.categories);
      });
  }, []);

  const filteredData = data.filter(
    ({ title: categoryTitle }) => categoryTitle === query.id
  );

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
      <CategoryFilter categories={data} active={query.id} />
      {filteredData.length
        ? filteredData.map(({ id, title, items }) => {
            return <Reel key={id} title={title} experiences={items} selected />;
          })
        : null}
    </WebApp>
  );
};

export default Category;
