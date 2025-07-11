# SkyReal - The Future of Reality

A modern, immersive website built with Next.js and Appwrite, featuring a stunning gradient design and seamless user experience.

## Features

- 🎨 Modern gradient design with glass morphism effects
- 📧 Email subscription functionality with Appwrite integration
- 📱 Fully responsive design
- ⚡ Built with Next.js 15 and React 19
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS for styling

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Appwrite (Database & Authentication)
- **Deployment**: Vercel-ready

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd skyreal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with your Appwrite configuration:
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint_here
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
   NEXT_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Appwrite Setup

1. Create an Appwrite project
2. Set up a database with a collection for email subscriptions
3. Configure the collection with the following attributes:
   - `email` (string, required)
   - `subscribedAt` (string, required)
4. Update your environment variables with the correct IDs

## Project Structure

```
src/
├── app/
│   ├── episodes/
│   │   └── page.tsx          # Episodes page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/               # Reusable components
└── lib/
    └── appwrite.ts           # Appwrite configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Design Features

- **Gradient Backgrounds**: Beautiful purple-to-pink gradients
- **Glass Morphism**: Semi-transparent cards with backdrop blur
- **Smooth Animations**: Hover effects and transitions
- **Responsive Design**: Works perfectly on all devices
- **Modern Typography**: Clean, readable fonts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
