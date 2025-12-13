# EZMode Games Website

Modern Astro website with React components, Tailwind CSS, and comprehensive testing.

## Tech Stack

- **[Astro 5](https://astro.build)** - Static site framework
- **[React 19](https://react.dev)** - UI components
- **[Tailwind CSS 4](https://tailwindcss.com)** - Styling
- **[Biome](https://biomejs.dev)** - Linting & formatting
- **[Vitest](https://vitest.dev)** - Unit testing
- **[Playwright](https://playwright.dev)** - E2E & component testing
- **[Lefthook](https://github.com/evilmartians/lefthook)** - Git hooks

## Getting Started

```sh
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) to view the site.

## Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── pages/           # Astro pages (file-based routing)
│   ├── styles/          # Global styles
│   └── test/            # Test setup files
├── test/                # Tests (mirrors src/ structure)
│   ├── components/      # Component unit & integration tests
│   ├── pages/           # E2E tests for routes
│   └── utils/           # Utility tests
└── playwright/          # Playwright CT configuration
```

### Test File Organization

The `test/` directory mirrors `src/` structure:

- `*.test.tsx` - Unit tests (Vitest + Testing Library)
- `*.spec.tsx` - Component tests (Playwright CT)
- `*.spec.ts` - E2E tests (Playwright)

Example:
```
src/components/ui/button.tsx
test/components/ui/button.test.tsx  # Unit test
test/components/ui/button.spec.tsx  # Component test
```

## Available Commands

### Development

| Command | Description |
| :------ | :---------- |
| `pnpm dev` | Start dev server at `localhost:4321` |
| `pnpm build` | Build production site to `./dist/` |
| `pnpm preview` | Preview production build locally |

### Code Quality

| Command | Description |
| :------ | :---------- |
| `pnpm lint` | Lint and auto-fix with Biome |
| `pnpm typecheck` | Type check with Astro |
| `pnpm preflight` | Run all checks: lint, typecheck, build, tests |

### Testing

| Command | Description |
| :------ | :---------- |
| `pnpm test` | Run unit tests (single run) |
| `pnpm test:watch` | Run unit tests in watch mode |
| `pnpm test:ui` | Run unit tests with Vitest UI |
| `pnpm test:coverage` | Run unit tests with coverage |
| `pnpm test:e2e` | Run E2E tests |
| `pnpm test:e2e:ui` | Run E2E tests with Playwright UI |
| `pnpm test:e2e:debug` | Debug E2E tests |
| `pnpm test:ct` | Run component tests |
| `pnpm test:ct:ui` | Run component tests with Playwright UI |

## Git Hooks

Lefthook automatically runs on:

- **pre-commit**: Lints staged files + type checking
- **pre-push**: Full preflight (lint, typecheck, build, all tests)

## Testing Guide

See [TESTING.md](TESTING.md) for detailed testing documentation.

## Learn More

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Vitest Documentation](https://vitest.dev)
- [Playwright Documentation](https://playwright.dev)

