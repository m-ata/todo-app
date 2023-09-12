import { rest } from 'msw';
import { mockData, API_URL } from '../data';

export const handlers = [
  rest.get(`${API_URL}/todos`, (_req, res, ctx) => {

    // successful response
    return res(ctx.status(200), ctx.json(mockData), ctx.delay(30));
  })
];
