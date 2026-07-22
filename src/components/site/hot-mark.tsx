export function HotMark({ className = '' }: Readonly<{ className?: string }>) {
  return (
    <span className={`hot-mark ${className}`.trim()} aria-hidden="true">
      <span className="hot-mark__signal">
        <svg className="hot-mark__flame" viewBox="0 0 24 30" role="presentation">
          <path d="M13.8 1.4c1.3 5.2-3.9 7.1-2.1 11.1 1.1-1.2 1.8-2.8 1.8-4.4 4.3 3.1 7 7 7 11.2 0 5.2-3.8 9.3-8.8 9.3S3 24.7 3 19.7c0-3.8 2.1-7.4 6.2-10.7-.2 3 1.1 4.9 2.4 5.9-1.1-4.7.3-8.8 2.2-13.5Z" />
          <path
            className="hot-mark__core"
            d="M12.1 17.2c2.5 2 3.2 3.6 3.2 5.2 0 2.1-1.5 3.8-3.6 3.8-2 0-3.5-1.5-3.5-3.6 0-1.7 1-3.4 3-5.2-.1 1.4.3 2.3.9 2.9.2-1 .2-2 0-3.1Z"
          />
        </svg>
      </span>
      <span className="hot-mark__word">H.O.T.</span>
    </span>
  );
}
