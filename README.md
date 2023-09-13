# Todo App

This is a Todo application which allow users to manage their tasks efficiently.

https://github.com/m-ata/todo-app-frontend/assets/30185021/fcc8bd6d-cad4-4725-b25a-003f16458f20

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Implementation Detail](#implementation-detail)

## Features

- Add, edit, and delete tasks.
- Mark tasks as completed.
- Responsive design (Table View on Desktop, Card View on Mobile).
- Form Validation (Task should be greater than 10 and less than equals to 100, deadline should not be less than today's date, and both the fields are required).
- Pagination for navigating through the tasks.

## Getting Started

Follow these steps to set up and run the project locally:
1. Clone the repository by following the command `git clone https://github.com/m-ata/todo-app-frontend.git`.
2. Navigate to the project directory: `cd todo-app-frontend`.
3. Install dependencies: `npm install`.
4. Start the development server: `npm run dev`.
5. Access the app by opening the web browser and navigating to http://localhost:3200/

PS: Before starting the development server, make sure the backend server is running on your local computer. You can clone the repository for the backend server from https://github.com/m-ata/todo-api

Follow these steps to run the tests locally.
1. Make sure, you have setup the project locally.
2. Run `npm run test` to run the test. (You might get error on `import.meta.env` on the console, please ignore it since jest is not independently compatible with vite. However, the test has already the coverage of more than 90% which is good enough).
3. Run `npm run test:coverage` to generate the coverage report locally.

## Implementation Detail
- **Routing:** The application incorporates client-side routing with lazy loading for optimal performance. A router outlet, wrapped in suspense with a fallback for improved user experience, is utilized. The primary route is /todo, while any attempts to access arbitrary routes will automatically redirect users to the /404 route.
- **Vite:** To maximize development speed, Vite is used as the module bundler since it is comparatively fast as compared to other bundlers such as Webpack, Rollup.
- **.env:** The project makes use of environment variables, which are loaded from `.env` file. While it's generally discouraged to upload .env files to a public repository, this project's configuration does not include any sensitive information, so I prefer to include it.
- **Style:** I love to write my own css instead of preferring UI library as you have a full control of your application css when you write custom styles and sometimes overriding classes is more diffuclt if the library renders it's classes at runtime. Sass and it's common features such as mixin, variables has been utilized to prevent repeatitive styles.
- **Utils:** Utility functions play a crucial role in preventing code duplication and adhering to the DRY (Don't Repeat Yourself) principle. Functions such as `getApiError` for error handling and `parseISODateToDayEnd` and `parseISODateToStringFormat` for date parsing are included.
- **Components Modularity:** Every component in the application follows the Single Responsibility Principle, meaning each component handles a specific task. For instance, `TodoItem` is responsible for rendering a single item, `Pagination` manages pagination, and `ConfirmationModal` handles confirmation for task deletion or completion, and so on.
- **HOC:** Higher-Order Components (HOCs) are used to encapsulate and share common logic among multiple components. The `withLoading` HOC, manages the loading state of components.
- **Hooks:** Custom hooks, such as useMobile for responsive design checking and useStatus for task status management, are developed to promote code reuse and maintainability.
- **Redux:** Managing states are sometime difficult when it comes to the complex system, therefore redux is used to manage the states throghout the system using @redux/toolkit since it allows you to break your states into slices. So, I created `todos` as persisited state and `paginationOptions` for managing pages in the application.
- **API:** API integration is streamlined using RTK Query and mutations, providing built-in support for tracking `data`, and `error` states. RTK Query is highly recommended, as it seamlessly integrates with Redux Toolkit, eliminating the need for additional libraries like `axios`.
- **Linting:** As we are software developers, we do common mistakes while writing the code which could cost us so I have setup ESLint and write `.eslintrv.yml` to prevent unnecessary code breaking. You can run `npm run lint` to check the linting errors/warning, if you get any error you may run `npm run lint:fix` to fix all those errors.
- **Prettier:** Formatting is one of the major factor when it comes to the readability of the code, so the prettier has been setup with `.prettierrc.yml` to format the code.
- **Testing:** Testing has been setup using `Jest` and `React Testing Library`. Unit tests is written to test key components, pages and utity functions. A mock msw server is created to fetch `todos`. Additionally, you can generate the test coverage report which will give you the summary of test results with 93% of coverage. Due to time limitation, I wasn't be able to write integration test but I am totally a big fan of writing it to test the intagrity of inter-related components.
