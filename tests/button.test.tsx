import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('does not submit a form unless submission is explicit', () => {
    render(<Button>Safe action</Button>);

    expect(screen.getByRole('button', { name: 'Safe action' })).toHaveAttribute('type', 'button');
  });

  it('preserves an explicit submit type', () => {
    render(<Button type="submit">Submit action</Button>);

    expect(screen.getByRole('button', { name: 'Submit action' })).toHaveAttribute('type', 'submit');
  });
});
