import React from 'react';

function Loading(props: { className: string }) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" className={props.className}>
      <path d="M13 3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM8 5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm10 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM5.5 9A2.502 2.502 0 003 11.5C3 12.879 4.121 14 5.5 14S8 12.879 8 11.5 6.879 9 5.5 9zm14 1a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-1 5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM8 16a1.999 1.999 0 100 4 1.999 1.999 0 100-4zm5.5 2a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
    </svg>
  );
}

export default Loading;
