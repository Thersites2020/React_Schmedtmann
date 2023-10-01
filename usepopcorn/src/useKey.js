import { useEffect } from 'react';

export default function useKey(key, action) {
  useEffect(function() {
    function callbackListener(e) {
      if(e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    document.addEventListener('keydown', callbackListener);
    return function() {
      document.removeEventListener('keydown', callbackListener)
    }
  }, [action, key])
}
