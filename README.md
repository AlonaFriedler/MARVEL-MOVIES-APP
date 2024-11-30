# Marvel Movies App

A full-stack application showcasing Marvel movie data. The project consists of:

- **Client:** React-based frontend.
- **Server:** Express-based backend.
- **Shared:** Common types/interfaces for both client and server.

---

## Prerequisites

Before running the application, ensure you have the following:

- [Node.js (>= 18)](https://nodejs.org/)
- [npm (>= 8)](https://www.npmjs.com/)
- A TMDB API Key to fetch movie data. You can obtain one from [The Movie Database (TMDb)](https://www.themoviedb.org/documentation/api).

---

## Setup

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/AlonaFriedler/marvel-movies-app
cd marvel-movies-app
```

Install dependencies for the project:

```bash
npm install
npm install --prefix client
npm install --prefix server
```

Setting Up Environment Variables

Create a `.env` File
   At the root of your `server` folder (next to `index.ts`), create a `.env` file and add your `TMDB_API_KEY`:

   ```env
   TMDB_API_KEY=your_actual_api_key_here
   ```
---

## Scripts

### Run the Client and Server Together

- **Start server in production mode and app in dev mode:**
  ```bash
  npm start
  ```

- **Start the server in development mode (hot-reloading):**
  ```bash
  npm run start:dev
  ```

### Run Client or Server Individually

- **Client**
  - Start in dev mode:
    ```bash
    npm run client:start
    ```
  - Build for production:
    ```bash
    npm run client:build
    ```
  - Run tests:
    ```bash
    npm run client:test
    ```

- **Server**
  - Start in production mode:
    ```bash
    npm run server:start
    ```
  - Start in development mode:
    ```bash
    npm run server:start:dev
    ```
  - Build for production:
    ```bash
    npm run server:build
    ```

### Build Full App

```bash
npm run build
```

This builds production-ready code for both the client and the server.

---

## Directory Structure

```plaintext
marvel-movies-app/
├── client/     # React frontend
├── server/     # Express backend
├── shared/     # Shared types and utilities
├── package.json
└── README.md
```

---

## Running Locally

1. **Set up your environment:**
   - Follow the [Setup](#setup) instructions above.

2. **Run the app:**
   - Use the `npm start:dev` command to spin up both the client and server.
   - If working on the server only, use `npm run start:dev`.

3. **Access the app:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:5000](http://localhost:5000)

4. **Trigger Data Acquisition**

    - To populate the database with data send a GET request to this endpoint:
   ```bash
   http://localhost:5000/api/dataAcquisition/triggerDataAcquisition
   ```

    - Check the server logs to confirm the data has been allocated.

---

## Technology Stack

### Backend
- **Node.js** with **Express** for server-side application logic.
- **Sequelize ORM** with **SQLite** for raw data storage.
- **Materialized Views** in memory (mock for NoSQL DB): Optimized for fast query access.

### Frontend
- **React** for building the user interface.
- **React Router** for client-side navigation.
- **MUI (Material-UI)** for styling and component design.

### Shared
- **TypeScript** for type safety across client and server.

---
## Assumptions and Design Decisions

### Data Acquisition
- **Scope**: Only predefined movies and actors are processed.
- **Name Uniqueness**: Movies, characters, and actors are uniquely identified by their names.
- **Validation**: Assumes predefined movie and actor names match TMDB API data. Assumes an actor plays at most one character per movie. 


### Architecture
- **CQRS Pattern**: Separates read (queries) and write (updates) operations for scalability.
- **Materialized Views**: Optimized for high-frequency queries with minimal latency.
- **Eventual Consistency**: Prioritizes query performance over real-time data syncing.
- **Client-Side Rendering**: Built as a single-page application (SPA).

### Backend Databases
- **Relational Database (SQLite)**: Stores raw TMDB movie and actor data.
- **No-SQL Database (TBD)**: Used for materialized views and query optimized access.

## Current Limitations

- **Data Updates**:  
  - Currently fetched on demand using an API. Future improvements may include cron jobs.  
  - Materialized views are constructed from fetched data, not from stored database data.  
  - No triggers update materialized views upon raw data changes.  
  - Currently, the system fetches all the data and overwrites the database during each fetch. In a real-world scenario, we would likely process only the updated or new remote data to improve efficiency and reduce redundancy.  


- **Testing**:  
  - Unit, integration, and E2E tests are not implemented.  
  - Simple APIs were used to internally test relational DB persistence.

- **Error Handling**: Needs enhancement.

- **Data source IDs**:    
  - Currently, data source IDs are unused.

- **Coding Standards**:  
  - Tools like ESLint are lightly used (only on the client-side).  
  - Needs consistent enforcement of best practices.

- **User Authentication**: Not yet implemented.

- **Pagination**:  
  - To support large datasets pagination should be implemented.  
  - Requires server-side and client-side implementation, including data fetching, caching, and display.

- **Real-Time Updates**:  
  - Subscriptions to notify the client of server-side changes are not implemented.  
  - Users must re-fetch data to see updates.

- **Minimal Client State Management**:  
  - Data is re-fetched on navigation without global state sharing or caching.

- **Project Structure**:  
  - The client and server currently reside in the same repository with separate `package.json` files.  
  - Shared code (e.g., types) needs to be modularized for independent reuse.  
  - Deployment strategies (combined vs. separate) are undecided.

- **Client Development Mode**: The client app only runs in development mode; static file serving is not configured.

- **App Look and Feel**: Needs a custom design to align with the brand.

---

## Future Considerations

### Scalability and Extensibility
- **Separation of Concerns**:  
  - The data acquisition and materialized view services can be developed as independently scalable components.  
- **Query Optimization**:  
  - Materialized views and CQRS ensure high query rates with minimal latency.  
- **Flexible Data Updates**:  
  - Supports scaling through cron jobs or event-driven updates while maintaining performance.

---

## Author

**Alona Friedler**

---