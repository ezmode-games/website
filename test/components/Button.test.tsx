import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

/**
 * Example React component for testing
 */
function Button({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  );
}

/**
 * Example React component unit test using Testing Library
 * This tests React components in isolation with Vitest
 * Mirrors src/components/Button.tsx
 */
describe('Button Component', () => {
  it('should render with correct label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('should call onClick handler when clicked', async () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    render(<Button label="Test" onClick={handleClick} />);
    const button = screen.getByRole('button');
    button.click();

    expect(clicked).toBe(true);
  });
});
