'use client';

import { forwardRef } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleTheme } from '@/app/features/theme/themeSlice';
import './theme-toggle.css';

interface WithinToggleProps {
  duration?: number;
  className?: string;
  style?: CSSProperties;
  title?: string;
  'aria-label'?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  suppressHydrationWarning?: boolean;
}

const Within = forwardRef<HTMLButtonElement, WithinToggleProps>(function Within(
  {
    duration = 500,
    className = '',
    style = {},
    title = 'Toggle theme',
    'aria-label': ariaLabel = 'Toggle theme',
    onClick,
    suppressHydrationWarning = false,
    ...rest
  },
  ref,
) {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const isDark = theme === 'dark';

  const classes = [
    'theme-toggle',
    isDark ? 'theme-toggle--toggled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(toggleTheme());
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      onClick={handleClick}
      aria-label={ariaLabel}
      title={title}
      style={
        {
          '--theme-toggle-duration': `${duration}ms`,
          ...style,
        } as CSSProperties
      }
      suppressHydrationWarning={suppressHydrationWarning}
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        fill="currentColor"
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="theme-toggle__within"
      >
        <clipPath id="within-clip">
          <path d="M0 0h32v32H0Zm6 16a1 1 0 0 0 20 0 1 1 0 0 0-20 0" />
        </clipPath>
        <g clipPath="url(#within-clip)">
          <path d="M30.7 21.3 27.1 16l3.7-5.3c.4-.5.1-1.3-.6-1.4l-6.3-1.1-1.1-6.3c-.1-.6-.8-.9-1.4-.6L16 5l-5.4-3.7c-.5-.4-1.3-.1-1.4.6l-1 6.3-6.4 1.1c-.6.1-.9.9-.6 1.3L4.9 16l-3.7 5.3c-.4.5-.1 1.3.6 1.4l6.3 1.1 1.1 6.3c.1.6.8.9 1.4.6l5.3-3.7 5.3 3.7c.5.4 1.3.1 1.4-.6l1.1-6.3 6.3-1.1c.8-.1 1.1-.8.7-1.4zM16 25.1c-5.1 0-9.1-4.1-9.1-9.1 0-5.1 4.1-9.1 9.1-9.1s9.1 4.1 9.1 9.1c0 5.1-4 9.1-9.1 9.1z" />
        </g>
        <path
          className="theme-toggle__within__circle"
          d="M16 7.7c-4.6 0-8.2 3.7-8.2 8.2s3.6 8.4 8.2 8.4 8.2-3.7 8.2-8.2-3.6-8.4-8.2-8.4zm0 14.4c-3.4 0-6.1-2.9-6.1-6.2s2.7-6.1 6.1-6.1c3.4 0 6.1 2.9 6.1 6.2s-2.7 6.1-6.1 6.1z"
        />
        <path
          className="theme-toggle__within__inner"
          d="M16 9.5c-3.6 0-6.4 2.9-6.4 6.4s2.8 6.5 6.4 6.5 6.4-2.9 6.4-6.4-2.8-6.5-6.4-6.5z"
        />
      </svg>
    </button>
  );
});

export default Within;
