This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Deployed live on vercel at [citybusbd.com](https://citybusbd.com).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load PT Sans, a custom Google Font.

## API Reference
#### Get all stopages

GET /api/stops


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `None`    | `None`   | No parameters required     |

#### Get all buses

GET /api/bus

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `None`    | `None`   | No parameters required     |

#### Get available buses between two stops

GET /api/bus?from=stop_id&to=stop_id

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `from`    | `string` | **Required**. From stop id |
| `to`      | `string` | **Required**. To stop id   |