import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  UserSettings, 
  DEFAULT_USER_SETTINGS, 
  SpicyLevel, 
  FontSize, 
  WeekDay, 
  RotationFrequency,
  Language 
} from '../types/settings';
import { loadUserSettings, saveUserSettings, resetUserSettings, applyUISettings } from '../utils/settingsUtils';

/**
 * Interface for the settings context value
 */
interface SettingsContextType {
  settings: UserSettings;
  updateDietaryPreference: (key: keyof UserSettings['dietaryPreferences'], value: boolean | SpicyLevel | string[]) => void;
  updateServingsSettings: (key: keyof UserSettings['servings'], value: number | boolean | WeekDay[]) => void;
  updateMealPlanningSettings: (key: keyof UserSettings['mealPlanning'], value: boolean | RotationFrequency) => void;
  updateShoppingSettings: (key: keyof UserSettings['shopping'], value: boolean | string | string[]) => void;
  updateUIPreference: (key: keyof UserSettings['ui'], value: boolean | FontSize | Language) => void;
  updateAllergiesList: (allergies: string[]) => void;
  updateExtraItemsList: (items: string[]) => void;
  updateMealPrepDays: (days: WeekDay[]) => void;
  applySettings: () => void;
  resetSettings: () => void;
}

/**
 * Create the settings context with default values
 */
const SettingsContext = createContext<SettingsContextType>({
  settings: DEFAULT_USER_SETTINGS,
  updateDietaryPreference: () => {},
  updateServingsSettings: () => {},
  updateMealPlanningSettings: () => {},
  updateShoppingSettings: () => {},
  updateUIPreference: () => {},
  updateAllergiesList: () => {},
  updateExtraItemsList: () => {},
  updateMealPrepDays: () => {},
  applySettings: () => {},
  resetSettings: () => {},
});

/**
 * Props for the SettingsProvider component
 */
interface SettingsProviderProps {
  children: ReactNode;
}

/**
 * Provider component for settings context
 */
export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  // Initialize state with default settings
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_USER_SETTINGS);
  
  // Load settings from local storage on component mount
  useEffect(() => {
    const savedSettings = loadUserSettings();
    setSettings(savedSettings);
    
    // Apply settings to the application immediately
    applyUISettings(savedSettings);
  }, []);
  
  // Save settings to local storage whenever they change
  useEffect(() => {
    saveUserSettings(settings);
  }, [settings]);
  
  /**
   * Updates a dietary preference setting
   */
  const updateDietaryPreference = (
    key: keyof UserSettings['dietaryPreferences'], 
    value: boolean | SpicyLevel | string[]
  ) => {
    setSettings(prev => ({
      ...prev,
      dietaryPreferences: {
        ...prev.dietaryPreferences,
        [key]: value,
      },
    }));
  };
  
  /**
   * Updates a servings setting
   */
  const updateServingsSettings = (
    key: keyof UserSettings['servings'], 
    value: number | boolean | WeekDay[]
  ) => {
    setSettings(prev => ({
      ...prev,
      servings: {
        ...prev.servings,
        [key]: value,
      },
    }));
  };
  
  /**
   * Updates a meal planning setting
   */
  const updateMealPlanningSettings = (
    key: keyof UserSettings['mealPlanning'], 
    value: boolean | RotationFrequency
  ) => {
    setSettings(prev => ({
      ...prev,
      mealPlanning: {
        ...prev.mealPlanning,
        [key]: value,
      },
    }));
  };
  
  /**
   * Updates a shopping preference setting
   */
  const updateShoppingSettings = (
    key: keyof UserSettings['shopping'], 
    value: boolean | string | string[]
  ) => {
    setSettings(prev => ({
      ...prev,
      shopping: {
        ...prev.shopping,
        [key]: value,
      },
    }));
  };
  
  /**
   * Updates a UI preference setting
   */
  const updateUIPreference = (
    key: keyof UserSettings['ui'], 
    value: boolean | FontSize | Language
  ) => {
    setSettings(prev => ({
      ...prev,
      ui: {
        ...prev.ui,
        [key]: value,
      },
    }));
  };
  
  /**
   * Updates the allergies list
   */
  const updateAllergiesList = (allergies: string[]) => {
    setSettings(prev => ({
      ...prev,
      dietaryPreferences: {
        ...prev.dietaryPreferences,
        allergies,
      },
    }));
  };
  
  /**
   * Updates the extra items list for shopping
   */
  const updateExtraItemsList = (items: string[]) => {
    setSettings(prev => ({
      ...prev,
      shopping: {
        ...prev.shopping,
        addExtraItems: items,
      },
    }));
  };
  
  /**
   * Updates the meal prep days
   */
  const updateMealPrepDays = (days: WeekDay[]) => {
    setSettings(prev => ({
      ...prev,
      servings: {
        ...prev.servings,
        mealPrepDays: days,
      },
    }));
  };
  
  /**
   * Applies current settings to the application
   */
  const applySettings = () => {
    applyUISettings(settings);
  };
  
  /**
   * Resets all settings to default values
   */
  const resetSettings = () => {
    resetUserSettings();
    setSettings(DEFAULT_USER_SETTINGS);
    applyUISettings(DEFAULT_USER_SETTINGS);
  };
  
  return (
    <SettingsContext.Provider 
      value={{ 
        settings, 
        updateDietaryPreference, 
        updateServingsSettings,
        updateMealPlanningSettings,
        updateShoppingSettings,
        updateUIPreference,
        updateAllergiesList,
        updateExtraItemsList,
        updateMealPrepDays,
        applySettings,
        resetSettings 
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

/**
 * Custom hook for accessing and updating settings
 */
export const useSettings = () => {
  const context = useContext(SettingsContext);
  
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  
  return context;
};
