import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useDarkMode = () => {
    const [dark, setDark] = useLocalStorage('darkSetting', false);

    useEffect(() => {
        const bodyEl = document.querySelector('body');
        if (dark === true) {
            bodyEl.classList.add('dark-mode');
        } else {
            bodyEl.classList.remove('dark-mode');
        }
    }, [dark]);
    
    return [dark, setDark];
}

export default useDarkMode;