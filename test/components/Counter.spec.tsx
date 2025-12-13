import { expect, test } from '@playwright/experimental-ct-react';
import { Counter } from '../../src/components/Counter';

/**
 * Example Playwright Component Test
 * Tests React components in isolation with real browser rendering
 * Component tests for src/components/Counter.tsx
 */
test.describe('Counter Component', () => {
  test('should render with initial count of 0', async ({ mount }) => {
    const component = await mount(<Counter />);
    await expect(component.getByRole('heading')).toContainText('Counter: 0');
  });

  test('should increment counter when increment button is clicked', async ({ mount }) => {
    const component = await mount(<Counter />);

    const incrementButton = component.getByRole('button', { name: 'Increment' });
    await incrementButton.click();

    await expect(component.getByRole('heading')).toContainText('Counter: 1');
  });

  test('should decrement counter when decrement button is clicked', async ({ mount }) => {
    const component = await mount(<Counter />);

    const decrementButton = component.getByRole('button', { name: 'Decrement' });
    await decrementButton.click();

    await expect(component.getByRole('heading')).toContainText('Counter: -1');
  });

  test('should handle multiple interactions', async ({ mount }) => {
    const component = await mount(<Counter />);

    const incrementButton = component.getByRole('button', { name: 'Increment' });
    const decrementButton = component.getByRole('button', { name: 'Decrement' });

    await incrementButton.click();
    await incrementButton.click();
    await incrementButton.click();
    await expect(component.getByRole('heading')).toContainText('Counter: 3');

    await decrementButton.click();
    await expect(component.getByRole('heading')).toContainText('Counter: 2');
  });
});
