# E-commerce Next.js frontend — redesigned UI

This is a UI redesign of the original `ecommnextjs` frontend. Existing page routes, API calls, authentication context, cart actions, order checkout, and payment gateway selection have been retained; the main changes are the visual theme, navigation, hero section, and global styling.

## Setup

1. Extract this folder.
2. Install dependencies: `npm install`
3. Create a `.env.local` file in the project root and set your FastAPI base URL:

   `NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000`

   Replace the URL with the address/port where your FastAPI backend is running.
4. Start the frontend: `npm run dev`
5. Open `http://localhost:3000`.

Run your FastAPI backend separately. This package intentionally excludes `.env` files, `.next`, `node_modules`, and virtual-environment/build files. Do not commit real secrets to source control.

## Notes

- Login/register, product search, cart, shipping-address selection, order creation, and payment gateway selection continue to use the existing frontend logic and backend endpoints.
- The checkout page currently uses the original project's `simulate_success: true` setting. Verify the backend's payment integration before using this for real transactions.
- The hero references `/public/hero-image.png` as the original project did. If that asset is missing, add an image there or replace the image source.
