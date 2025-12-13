import React from 'react';

/**
 * Example Counter component for Playwright component testing
 */
export function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button type="button" onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button type="button" onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}
