import * as React from 'react';

const useScrollLock = (lock: boolean) => {
  React.useEffect(() => {
    if (lock) {
      const html = window.document.documentElement;
      const scrollTop = html.scrollTop;

      window.requestAnimationFrame(() => {
        html.style.position = 'fixed';
        html.style.overflow = 'hidden';
        html.style.width = '100%';
        html.style.top = `-${scrollTop}px`;
      });

      return () => {
        window.requestAnimationFrame(() => {
          html.style.position = '';
          html.style.overflow = '';
          html.style.width = '';
          html.scrollTop = scrollTop;
        });
      }
    }
  }, [lock]);
};

export default useScrollLock;
