# Mentorship Portal

Built with [Next JS](https://nextjs.org) and styled with [Material UI](https://mui.com)

## Folder Structure

- /prisma
  - schema.prisma - Stores all the schemas for the SQLite database
  - dev.sqlite - Database file
- /src
  - /assets - Static assets
  - /components - Contains all the reusable components
  - /helpers - Contains all the reusable functions
  - /pages - Folder for all the pages
    - /api - API routes
  - /styles/global.css - CSS file
  - /utils - Utilities like contexts, types and other necessary things to run the next app

Detailed explanation of app structure can be found [here](https://nextjs.org/docs/advanced-features/src-directory)

## Dependencies

- next `13.2.4`
- react `1.2.0`
- react-dom `18.2.0`

## Dev Dependencies

- next `13.2.4`
- prisma `^5.0.0`
- node `^18.16.1`

## Getting Started

- Install the dependencies `npm install`
- Add a `.env` file at root to store all the environment variables. You can find the template for `.env` file at `.env.template`
- Migrate the schema and create the database from the migration `npm run migrate`
- Generate database config from the migrations `npm run generate`
- Start the application `npm run dev`
- Next app runs on port `3000` by default. App can be accessed from [http://localhost:3000](http://localhost:3000). API can be accessed from [http://localhost:3000/api](http://localhost:3000/api)