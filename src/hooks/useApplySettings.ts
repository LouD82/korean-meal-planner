import { useEffect } from 'react';
import { useSettings } from './useSettings';

/**
 * Custom hook to apply user interface settings to the application
 */
export const useApplySettings = () => {
  const { settings } = useSettings();
  
  useEffect(() => {
    // Apply dark mode
    if (settings.ui.darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    
    // Apply font size
    document.documentElement.setAttribute('data-font-size', settings.ui.fontSize);
    
    // Apply compact view
    if (settings.ui.compactView) {
      document.documentElement.classList.add('compact-view');
    } else {
      document.documentElement.classList.remove('compact-view');
    }
    
    // Apply language (could be expanded with i18n implementation)
    document.documentElement.setAttribute('lang', 
      settings.ui.language === 'korean' ? 'ko' : 'en');
    
  }, [
    settings.ui.darkMode,
    settings.ui.fontSize,
    settings.ui.compactView,
    settings.ui.language
  ]);
  
  return { settings };
};

export default useApplySettings;