import type { NextApiRequest, NextApiResponse } from 'next';

const artificialDelay = 2000;
const hardCodedResponse: Data = { value: 42 };
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

type Data = {
  value: number;
};

type ResponseData = {
  data?: Data;
  error?: string;
};

// req = HTTP incoming message, res = HTTP server response
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // const { name, message } = req.body;
  const { monster } = req.query;

  console.log('monster', monster);

  if (req.method === 'POST') {
    // Process a POST request
  } else {
    // Handle any other HTTP method
    try {
      const data = await someAsyncOperation();

      res.status(200).json({ data });
    } catch (err) {
      res.status(500).json(errorResponse);
    }
  }
}
