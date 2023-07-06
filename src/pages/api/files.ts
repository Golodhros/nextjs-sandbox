import type { NextApiRequest, NextApiResponse } from 'next';

import type { APIResponseData, Data, FileTreeNode } from '../../types';

const artificialDelay = 1000;

const testData: FileTreeNode = {
  name: 'project',
  kind: 'directory',
  children: [
    {
      name: 'src',
      kind: 'directory',
      children: [
        {
          name: 'index.js',
          kind: 'file',
          size: '1KB',
          modified: '2022-03-08 11:30:00',
        },
        {
          name: 'components',
          kind: 'directory',
          children: [
            {
              name: 'Button.jsx',
              kind: 'file',
              size: '2KB',
              modified: '2022-03-07 15:00:00',
            },
            {
              name: 'Card.jsx',
              kind: 'file',
              size: '3KB',
              modified: '2022-03-06 10:00:00',
            },
          ],
        },
        {
          name: 'styles',
          kind: 'directory',
          children: [
            {
              name: 'index.css',
              kind: 'file',
              size: '1KB',
              modified: '2022-03-07 09:00:00',
            },
            {
              name: 'components.css',
              kind: 'file',
              size: '2KB',
              modified: '2022-03-06 12:00:00',
            },
          ],
        },
      ],
    },
    {
      name: 'public',
      kind: 'directory',
      children: [
        {
          name: 'index.html',
          kind: 'file',
          size: '1KB',
          modified: '2022-03-08 10:00:00',
        },
        {
          name: 'favicon.ico',
          kind: 'file',
          size: '5KB',
          modified: '2022-03-07 16:00:00',
        },
      ],
    },
    {
      name: 'package.json',
      kind: 'file',
      size: '1KB',
      modified: '2022-03-08 12:00:00',
    },
    {
      name: 'README.md',
      kind: 'file',
      size: '2KB',
      modified: '2022-03-08 13:00:00',
    },
  ],
};
const hardCodedResponse: Data = { data: testData };
const errorResponse = {
  data: undefined,
  error: 'failed to load data',
};

function someAsyncOperation() {
  return new Promise<Data>((resolve) => {
    setTimeout(() => {
      resolve(hardCodedResponse);
    }, artificialDelay);
  });
}

// req = HTTP incoming message, res = HTTP server response
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponseData>
) {
  // const { name, message } = req.body;

  if (req.method === 'POST') {
    // Process a POST request
  } else {
    // Handle any other HTTP method
    try {
      const { data } = await someAsyncOperation();

      res.status(200).json({ data });
    } catch (err) {
      res.status(500).json(errorResponse);
    }
  }
}
