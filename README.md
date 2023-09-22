# EMT Portal

Built with [Next JS](https://nextjs.org) and styled with [Material UI](https://mui.com)

## Assumptions:

 - Engineering Managers - Admin
 - Other employees - Students
 - Mentors as assigned by admins

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

## Production Dependencies

- forever `4.0.3`

## Getting Started

- Install the dependencies `npm install`
- Add a `.env` file at root to store all the environment variables. You can find the template for `.env` file at `.env.template`
- Migrate the schema and create the database from the migration `npm run migrate`
- Generate database config from the migrations `npm run generate`
- Start the application `npm run dev`
- Next app runs on port `3000` by default. App can be accessed from [http://localhost:3000](http://localhost:3000). API can be accessed from [http://localhost:3000/api](http://localhost:3000/api)

## For production build

- Migrate the schema to deploy mode `npx prisma migrate deploy`
- Generate database config from the migrations `npm run generate`
- Generate Next build `npm run build`. Build files are generate in `.next` folder.
- Start the server `npm start`

## For deployment

- If you are deploying the app in a new server, make sure you have all the `Production Dependencies` installed.
- From the terminal, run `npm run deploy`. This will automatically stop the running server and fetch the latest code and run the buils. After these processes, it'll start a background process with `forever` (Look at the resources to know more about forever cli)

## Resources

- Next JS - [https://nextjs.org](https://nextjs.org)
- Material UI - [https://mui.com](https://mui.com)
- Prisma - [https://prisma.io](https://prisma.io)
- SQLite - [https://www.sqlite.org](https://www.sqlite.org)
- Forever - [https://www.npmjs.com/package/forever](https://www.npmjs.com/package/forever)
- Prisma Schema - [https://www.prisma.io/docs/concepts/components/prisma-schema](https://www.prisma.io/docs/concepts/components/prisma-schema)
- One to Many relationship in Prisma - [https://www.prisma.io/docs/concepts/components/prisma-schema/relations/one-to-many-relations](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/one-to-many-relations)
- Many to Many relationship in Prisma - [https://www.prisma.io/docs/concepts/components/prisma-schema/relations/many-to-many-relations](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/many-to-many-relations)
- TypeScript - [https://www.typescriptlang.org](https://www.typescriptlang.org)
- Typescript types - [https://www.typescriptlang.org/docs/handbook/2/everyday-types.html](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- User defined types in TypeScript - [https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)
- Interfaces in TypeScript - [https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces)
- Difference between type and interface in TypeScript - [https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)
- Creating pages in Next JS - [https://nextjs.org/docs/basic-features/pages](https://nextjs.org/docs/basic-features/pages)
- Creating reusable components in Next JS - [https://nextjs.org/docs/basic-features/components](https://nextjs.org/docs/basic-features/components)
- Contexts in React - [https://reactjs.org/docs/context.html](https://reactjs.org/docs/context.html)
- usEffect, useState in React - [https://reactjs.org/docs/hooks-effect.html](https://reactjs.org/docs/hooks-effect.html)
- MUI Themes - [https://mui.com/customization/theming](https://mui.com/customization/theming)
- Adding styles to MUI components with sx prop - [https://mui.com/system/the-sx-prop](https://mui.com/system/the-sx-prop)
- Building custom MUI components - [https://mui.com/guides/composition/#customization](https://mui.com/guides/composition/#customization)
