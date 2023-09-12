import '@testing-library/jest-dom';
import '@testing-library/react';

import { server } from './__tests__/mock/api/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
