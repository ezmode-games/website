# Testing Configuration for Astro Site

This project is configured with comprehensive testing setup for late 2025:

## Testing Stack

- **Vitest**: Unit testing for utilities and React components
- **Playwright**: E2E testing for full application flows
- **Playwright Component Testing**: React component testing in isolation with real browser rendering
- **Testing Library**: React component testing utilities for Vitest

## Test Scripts

```bash
# Unit Tests (Vitest)
pnpm test              # Run tests in watch mode
pnpm test:ui           # Run tests with Vitest UI
pnpm test:coverage     # Run tests with coverage report

# E2E Tests (Playwright)
pnpm test:e2e          # Run E2E tests
pnpm test:e2e:ui       # Run E2E tests with Playwright UI
pnpm test:e2e:debug    # Debug E2E tests

# Component Tests (Playwright CT)
pnpm test:ct           # Run component tests
pnpm test:ct:ui        # Run component tests with Playwright UI
```

## Test File Organization

The `test/` directory mirrors the `src/` structure:

```
src/
  components/
    ui/
      button.tsx          # Source component
  utils/
    helpers.ts            # Source utilities
  pages/
    index.astro           # Route/page

test/
  components/
    ui/
      button.test.tsx     # Unit tests (Vitest + Testing Library)
      button.spec.tsx     # Component tests (Playwright CT)
  utils/
    helpers.test.ts       # Unit tests for utilities
  pages/
    index.spec.ts         # E2E tests for the / route
```

## File Naming Conventions

- `*.test.ts(x)` - Vitest unit tests (in `test/` folder)
- `*.spec.tsx` - Playwright Component tests (in `test/` folder)
- `*.spec.ts` - Playwright E2E tests (in `test/pages/` folder)

All test files live in the `test/` directory which mirrors your `src/` structure.

## Configuration Files

- `vitest.config.ts` - Vitest configuration with Astro integration
- `playwright.config.ts` - Playwright E2E configuration
- `playwright-ct.config.ts` - Playwright Component Testing configuration
- `src/test/setup.ts` - Vitest setup file

## Best Practices (Late 2025)

1. **Unit Tests**: Use Vitest for testing utilities and business logic
2. **Component Tests**: 
   - Use Testing Library with Vitest for simple component logic
   - Use Playwright CT for complex components requiring real browser rendering
3. **E2E Tests**: Use Playwright for full user flows and integration tests
4. **Astro Components**: Test Astro components through E2E tests, as they render on the server

## Getting Started

1. Install Playwright browsers (first time only):
   ```bash
   pnpm exec playwright install
   ```

2. Run the test suites:
   ```bash
   pnpm test              # Unit tests
   pnpm test:e2e          # E2E tests
   pnpm test:ct           # Component tests
   ```

## Notes

- The Vitest config uses `getViteConfig` from Astro to ensure compatibility
- E2E tests automatically start the dev server on port 4321
- Component tests use port 3100 for the test server
- Coverage reports are generated in the `coverage/` directory
- Test reports are saved to `playwright-report/` and `test-results/`
