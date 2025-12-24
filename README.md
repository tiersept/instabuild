# Instabuild

Add items and pricing to a list.

## Tech Stack

- [React](https://react.dev/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [Turborepo](https://turbo.build/) - Monorepo
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Biome](https://biomejs.dev/) - Linting & formatting
- Chrome Extension - Browser extension platform

## Monorepo Structure

### Apps

- `apps/app-extension` - Chrome extension application

### Packages

- `@repo/ui` - Shared UI component library
- `@repo/shared` - Shared utilities, types, and adapters
- `@repo/biome-config` - Shared Biome configuration
- `@repo/typescript-config` - Shared TypeScript configuration

## Prerequisites

Ensure you have [bun](https://bun.sh/docs/installation) and [turbo](https://turbo.build/repo/docs/getting-started/installation) installed.

## Getting Started

Install dependencies:

```sh
bun install
```

Development:

```sh
turbo run dev
```

Build:

```sh
turbo run build
```

Build creates a `release.zip` file.
