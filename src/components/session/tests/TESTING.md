# Testing Guide for Spevents

This project uses Jest and React Testing Library for unit and integration testing.

## Setup

To set up the testing environment, install the required dependencies:

```bash
npm install --save-dev @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/jest identity-obj-proxy jest jest-environment-jsdom ts-jest ts-node
```

## Running Tests

- To run all tests once:
  ```bash
  npm test
  ```

- To run tests in watch mode (tests re-run when files change):
  ```bash
  npm run test:watch
  ```

- To generate coverage reports:
  ```bash
  npm run test:coverage
  ```
  Coverage reports can be found in the `coverage` directory.

## Writing Tests

Tests are written using Jest and React Testing Library. Test files should be named `*.test.ts` or `*.test.tsx` and placed next to the files they are testing.

### Example:

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders the button with the correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
});
```

## Mocking

### Mocking Components or Functions

```tsx
jest.mock('../path/to/Component', () => ({
  Component: jest.fn(props => <div data-testid="mocked-component" {...props} />)
}));
```

### Mocking Contexts

```tsx
jest.mock('../contexts/SomeContext', () => ({
  useContext: jest.fn(() => ({
    someValue: 'test',
    someFunction: jest.fn()
  }))
}));
```

## Handling Animations

When testing components that use animations (like those from `framer-motion`), you'll need to mock the animation components:

```tsx
jest.mock('framer-motion', () => ({
  motion: {
    div: jest.fn(({ children, ...props }) => (
      <div data-testid="motion-div" {...props}>{children}</div>
    )),
  },
  AnimatePresence: jest.fn(({ children }) => <>{children}</>),
}));
```

## Testing Strategy

1. **Unit Tests**: Test individual components in isolation
2. **Integration Tests**: Test how components work together
3. **Coverage**: Aim for high test coverage, focusing on critical features

## Continuous Integration

Tests are automatically run during CI/CD pipelines. Make sure your tests pass before pushing code to the main branch.

## Best Practices

1. Test behavior, not implementation
2. Keep tests simple and focused
3. Use meaningful assertions
4. Avoid unnecessary mocks
5. Clean up after tests
6. Use appropriate selectors (prefer user-centric ones like `getByRole` over `getByTestId`)