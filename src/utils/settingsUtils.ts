import { UserSettings, DEFAULT_USER_SETTINGS } from '../types/settings';

/**
 * Constants for settings storage
 */
const USER_SETTINGS_KEY = 'korean-meal-planner-user-settings';
const USER_SETTINGS_VERSION = '1.0'; // For future migrations

/**
 * Saves the user settings to local storage
 * @param settings The user settings to save
 */
export const saveUserSettings = (settings: UserSettings): void => {
  try {
    const settingsWithVersion = {
      version: USER_SETTINGS_VERSION,
      settings
    };
    localStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(settingsWithVersion));
  } catch (error) {
    console.error('Error saving user settings to local storage:', error);
  }
};

/**
 * Loads the user settings from local storage
 * @returns The user settings, or default settings if none are found
 */
export const loadUserSettings = (): UserSettings => {
  try {
    const settingsJson = localStorage.getItem(USER_SETTINGS_KEY);
    if (!settingsJson) {
      return DEFAULT_USER_SETTINGS;
    }
    
    // Parse the settings with version checking
    const savedData = JSON.parse(settingsJson);
    
    // If it's the new versioned format
    if (savedData.version && savedData.settings) {
      // Handle version migrations here if needed in the future
      return mergeWithDefaults(savedData.settings);
    } 
    // If it's the legacy format (no version)
    else {
      return mergeWithDefaults(savedData);
    }
  } catch (error) {
    console.error('Error loading user settings from local storage:', error);
    return DEFAULT_USER_SETTINGS;
  }
};

/**
 * Merges partial user settings with default settings
 * @param savedSettings Partial user settings from storage
 * @returns Complete user settings with defaults for any missing properties
 */
const mergeWithDefaults = (savedSettings: Partial<UserSettings>): UserSettings => {
  // Deep merge function for object properties
  const mergeDeep = <T extends Record<string, any>>(target: T, source: Partial<T>): T => {
    const result = { ...target };
    
    if (!source) return result;
    
    Object.keys(source).forEach(key => {
      if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        // If property is an object, recursively merge
        result[key] = mergeDeep(target[key] as any, source[key] as any);
      } else {
        // Otherwise just copy the value
        result[key] = source[key] as any;
      }
    });
    
    return result;
  };
  
  // Apply deep merge for each main settings section
  return {
    dietaryPreferences: mergeDeep(
      DEFAULT_USER_SETTINGS.dietaryPreferences,
      savedSettings.dietaryPreferences || {}
    ),
    servings: mergeDeep(
      DEFAULT_USER_SETTINGS.servings,
      savedSettings.servings || {}
    ),
    mealPlanning: mergeDeep(
      DEFAULT_USER_SETTINGS.mealPlanning,
      savedSettings.mealPlanning || {}
    ),
    shopping: mergeDeep(
      DEFAULT_USER_SETTINGS.shopping,
      savedSettings.shopping || {}
    ),
    ui: mergeDeep(
      DEFAULT_USER_SETTINGS.ui,
      savedSettings.ui || {}
    ),
  };
};

/**
 * Resets the user settings to default values
 */
export const resetUserSettings = (): void => {
  try {
    localStorage.removeItem(USER_SETTINGS_KEY);
  } catch (error) {
    console.error('Error resetting user settings in local storage:', error);
  }
};

/**
 * Exports user settings as a JSON file for backup
 */
export const exportSettings = (): void => {
  try {
    const settings = loadUserSettings();
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `korean-meal-planner-settings-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  } catch (error) {
    console.error('Error exporting settings:', error);
  }
};

/**
 * Imports user settings from a JSON file
 * @param fileContent The JSON content to import
 * @returns True if import was successful, false otherwise
 */
export const importSettings = (fileContent: string): boolean => {
  try {
    const settings = JSON.parse(fileContent) as UserSettings;
    const validatedSettings = mergeWithDefaults(settings);
    saveUserSettings(validatedSettings);
    return true;
  } catch (error) {
    console.error('Error importing settings:', error);
    return false;
  }
};

/**
 * Apply settings to the application UI
 * @param settings The settings to apply
 */
export const applyUISettings = (settings: UserSettings): void => {
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
};
