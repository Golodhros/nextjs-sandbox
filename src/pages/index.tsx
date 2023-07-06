/* eslint-disable react/no-unused-prop-types */
/* eslint-disable tailwindcss/no-custom-classname */
import axios from 'axios';
import lodash from 'lodash';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useReducer, useRef, useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const STAR_WARS_API_ENDPOINT = 'https://swapi.dev/api/people/?search=';
const DEBOUNCE_DELAY = 250;

type Result = {
  name: string;
  birth_year: string;
  url: string;
  homeworld: string;
};

type PersonDataShape = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
};

type PlanetDataShape = {
  name: string;
  climate: string;
  population: string;
};

type FetchState = {
  isLoading: boolean;
  isError: boolean;
  data: PersonDataShape | PlanetDataShape;
};

type Action = {
  type: 'FETCH_INIT' | 'FETCH_SUCCESS' | 'FETCH_FAILURE';
  payload?: any;
};

const dataFetchReducer = (state: FetchState, action: Action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const formatNumber = (number: number) =>
  new Intl.NumberFormat('en-us').format(number);

const queryCache = new Map();

const useStarWarsAPI = (
  initialData: any
): [FetchState, Dispatch<SetStateAction<string>>, number] => {
  const [url, setUrl] = useState<string>('');
  const requestCount = useRef<number>(0);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await axios(url);
        requestCount.current += 1;

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
          queryCache.set(url, result.data);
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    if (queryCache.has(url)) {
      console.log('hitting url cache!');
      dispatch({ type: 'FETCH_SUCCESS', payload: queryCache.get(url) });
    } else if (url) {
      fetchData();
    }

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl, requestCount.current];
};

type CharacterProps = Result;

function Character({
  name,
  birth_year,
  homeworld,
}: CharacterProps): JSX.Element {
  const [state, setUrl] = useStarWarsAPI({});
  const planetData = state.data as PlanetDataShape;

  useEffect(() => {
    setUrl(homeworld);
  }, [homeworld]);

  return (
    <div className="character-item">
      <h2>
        <strong>{name}</strong> (born {birth_year})
      </h2>
      <div className="planet-item">
        {planetData && (
          <>
            <h3>{planetData.name}</h3>
            <p>
              {planetData.name} is <strong>{planetData.climate}</strong>, with a
              population of{' '}
              <strong>
                {formatNumber(parseInt(planetData.population, 10))}
              </strong>
              .
            </p>
          </>
        )}
      </div>
      <hr />
    </div>
  );
}

function StarWarsSearch(): JSX.Element {
  const [state, setUrl, requestCount] = useStarWarsAPI({});
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleSearch = lodash.debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchQuery = e.target.value;

      if (searchQuery) {
        setUrl(`${STAR_WARS_API_ENDPOINT}${searchQuery}`);
      }
    },
    DEBOUNCE_DELAY
  );
  const personData = state.data as PersonDataShape;

  return (
    <div className="container">
      <div className="filter-panel">
        <input
          ref={searchInputRef}
          className="search-input rounded border-2 border-black"
          onChange={handleSearch}
        />
        <div className="loading-message">
          {state.isLoading && <>Loading...</>}
        </div>
      </div>
      <div className="list">
        <div className="total-requests">
          ({requestCount} requests executed so far)
        </div>
        {state && personData.results?.length ? (
          <ul className="people-list">
            {personData.results.map(
              ({ name, birth_year, url, homeworld }: Result) => {
                return (
                  <li key={url}>
                    <Character
                      name={name}
                      url={url}
                      birth_year={birth_year}
                      homeworld={homeworld}
                    />
                  </li>
                );
              }
            )}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title="Next.js Sandbox"
          description="Next.js Sandbox page description"
        />
      }
    >
      <h2 className="text-2xl font-bold">Dreambound Star Wars Search</h2>
      <StarWarsSearch />
    </Main>
  );
};

export default Index;
