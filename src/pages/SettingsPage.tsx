import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { useSettings } from '../hooks/useSettings';
import { 
  SpicyLevel, 
  FontSize, 
  WeekDay, 
  RotationFrequency, 
  Language 
} from '../types/settings';
import { 
  Alert, 
  Badge, 
  Button, 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter, 
  Checkbox, 
  Container, 
  DaySelector, 
  Section, 
  TagInput 
} from '../components/ui';
import { exportSettings, importSettings } from '../utils/settingsUtils';
import './SettingsPage.css';

/**
 * Settings Page Component
 * Allows users to customize their meal planning experience
 */
const SettingsPage = () => {
  const { 
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
  } = useSettings();
  
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [importError, setImportError] = useState(false);
  const [activeTab, setActiveTab] = useState<'dietary' | 'meal-planning' | 'interface' | 'shopping'>('dietary');
  
  // Ref for import settings file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Apply settings when component mounts
  useEffect(() => {
    applySettings();
  }, []);
  
  /**
   * Handles saving settings and showing success message
   */
  const handleSave = () => {
    // Apply settings to UI (dark mode, font size, etc.)
    applySettings();
    
    // Show success message
    setSaveSuccess(true);
    
    // Hide the success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };
  
  /**
   * Handles resetting settings to defaults after confirmation
   */
  const handleReset = () => {
    resetSettings();
    setShowResetConfirm(false);
    setSaveSuccess(true);
    
    // Hide the success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };
  
  /**
   * Handles exporting settings as JSON
   */
  const handleExport = () => {
    exportSettings();
  };
  
  /**
   * Handles importing settings from JSON file
   */
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  /**
   * Processes the imported settings file
   */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importSettings(content);
      
      if (success) {
        setImportSuccess(true);
        // Reload page after successful import to apply new settings
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setImportError(true);
        setTimeout(() => setImportError(false), 3000);
      }
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    
    reader.readAsText(file);
  };
  
  return (
    <Container>
      <div className="settings-page">
        <Section title="Settings & Preferences">
          {/* Settings Tabs */}
          <div className="settings-tabs">
            <button 
              className={`settings-tab ${activeTab === 'dietary' ? 'active' : ''}`}
              onClick={() => setActiveTab('dietary')}
            >
              Dietary
            </button>
            <button 
              className={`settings-tab ${activeTab === 'meal-planning' ? 'active' : ''}`}
              onClick={() => setActiveTab('meal-planning')}
            >
              Meal Planning
            </button>
            <button 
              className={`settings-tab ${activeTab === 'shopping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shopping')}
            >
              Shopping
            </button>
            <button 
              className={`settings-tab ${activeTab === 'interface' ? 'active' : ''}`}
              onClick={() => setActiveTab('interface')}
            >
              Interface
            </button>
          </div>
          
          <Card>
            <CardContent>
              {/* Alert Messages */}
              {saveSuccess && (
                <Alert type="success" onClose={() => setSaveSuccess(false)}>
                  Settings saved successfully!
                </Alert>
              )}
              
              {importSuccess && (
                <Alert type="success" onClose={() => setImportSuccess(false)}>
                  Settings imported successfully! Reloading page...
                </Alert>
              )}
              
              {importError && (
                <Alert type="error" onClose={() => setImportError(false)}>
                  Error importing settings. Please check the file format.
                </Alert>
              )}
              
              {showResetConfirm && (
                <Alert type="warning" onClose={() => setShowResetConfirm(false)}>
                  <div>
                    <p>Are you sure you want to reset all settings to default values?</p>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <Button onClick={handleReset} variant="danger" size="small">
                        Yes, Reset
                      </Button>
                      <Button onClick={() => setShowResetConfirm(false)} variant="secondary" size="small">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Alert>
              )}
              
              {/* Dietary Preferences Tab */}
              {activeTab === 'dietary' && (
                <div className="settings-tab-content">
                  <h2>Dietary Preferences</h2>
                  
                  <div className="settings-form-group">
                    <div className="settings-form-row">
                      <Checkbox 
                        id="vegetarian" 
                        checked={settings.dietaryPreferences.vegetarian}
                        onChange={(e) => updateDietaryPreference('vegetarian', e.target.checked)}
                        label="Vegetarian"
                      />
                    </div>
                    
                    <div className="settings-form-row">
                      <Checkbox 
                        id="vegan" 
                        checked={settings.dietaryPreferences.vegan}
                        onChange={(e) => updateDietaryPreference('vegan', e.target.checked)}
                        label="Vegan"
                      />
                    </div>
                    
                    <div className="settings-form-row">
                      <Checkbox 
                        id="glutenFree" 
                        checked={settings.dietaryPreferences.glutenFree}
                        onChange={(e) => updateDietaryPreference('glutenFree', e.target.checked)}
                        label="Gluten Free"
                      />
                    </div>
                    
                    <div className="settings-form-row">
                      <Checkbox 
                        id="dairyFree" 
                        checked={settings.dietaryPreferences.dairyFree}
                        onChange={(e) => updateDietaryPreference('dairyFree', e.target.checked)}
                        label="Dairy Free"
                      />
                    </div>
                    
                    <div className="settings-form-row">
                      <Checkbox 
                        id="lowSodium" 
                        checked={settings.dietaryPreferences.lowSodium}
                        onChange={(e) => updateDietaryPreference('lowSodium', e.target.checked)}
                        label="Low Sodium"
                      />
                    </div>
                  </div>
                  
                  <div className="settings-form-group">
                    <label htmlFor="spicyLevel">Spice Preference</label>
                    <select 
                      id="spicyLevel" 
                      className="settings-select"
                      value={settings.dietaryPreferences.spicyLevel}
                      onChange={(e) => updateDietaryPreference('spicyLevel', e.target.value as SpicyLevel)}
                    >
                      <option value="none">No Spice</option>
                      <option value="mild">Mild</option>
                      <option value="medium">Medium</option>
                      <option value="hot">Hot</option>
                    </select>
                  </div>
                  
                  <div className="settings-form-group">
                    <label>Food Allergies or Restrictions</label>
                    <TagInput 
                      tags={settings.dietaryPreferences.allergies} 
                      setTags={updateAllergiesList}
                      placeholder="Type an allergy and press Enter"
                      maxTags={15}
                    />
                    <p className="settings-help-text">
                      Add any food allergies or ingredients you want to avoid.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Meal Planning Tab */}
              {activeTab === 'meal-planning' && (
                <div className="settings-tab-content">
                  <h2>Meal Planning Preferences</h2>
                  
                  <div className="settings-form-group">
                    <label htmlFor="rotationFrequency">Meal Rotation Frequency</label>
                    <select 
                      id="rotationFrequency" 
                      className="settings-select"
                      value={settings.mealPlanning.rotationFrequency}
                      onChange={(e) => updateMealPlanningSettings('rotationFrequency', e.target.value as RotationFrequency)}
                    >
                      <option value="weekly">Weekly (New meals each week)</option>
                      <option value="biweekly">Bi-weekly (New meals every two weeks)</option>
                      <option value="monthly">Monthly (New meals every month)</option>
                    </select>
                    <p className="settings-help-text">
                      How often you want to change your meal plan rotation.
                    </p>
                  </div>
                  
                  <div className="settings-form-group">
                    <label>Meal Types to Include</label>
                    <div className="settings-form-row">
                      <Checkbox 
                        id="includeLunch" 
                        checked={settings.mealPlanning.includeLunch}
                        onChange={(e) => updateMealPlanningSettings('includeLunch', e.target.checked)}
                        label="Include Lunch Recipes"
                      />
                    </div>
                    
                    <div className="settings-form-row">
                      <Checkbox 
                        id="includeDinner" 
                        checked={settings.mealPlanning.includeDinner}
                        onChange={(e) => updateMealPlanningSettings('includeDinner', e.target.checked)}
                        label="Include Dinner Recipes"
                      />
                    </div>
                  </div>
                  
                  <div className="settings-form-group">
                    <label>Meal Preparation Days</label>
                    <DaySelector 
                      selectedDays={settings.servings.mealPrepDays}
                      onChange={updateMealPrepDays}
                    />
                    <p className="settings-help-text">
                      Select which days you prefer to prepare meals for the week.
                    </p>
                  </div>
                  
                  <div className="settings-form-group">
                    <label htmlFor="defaultServings">Default Number of Servings</label>
                    <input 
                      type="number" 
                      id="defaultServings" 
                      className="settings-number-input"
                      min="1" 
                      max="12" 
                      value={settings.servings.defaultServings}
                      onChange={(e) => updateServingsSettings('defaultServings', parseInt(e.target.value))}
                    />
                    <p className="settings-help-text">
                      The default number of servings for each recipe.
                    </p>
                  </div>
                  
                  <div className="settings-form-row">
                    <Checkbox 
                      id="adjustRecipes" 
                      checked={settings.servings.adjustRecipes}
                      onChange={(e) => updateServingsSettings('adjustRecipes', e.target.checked)}
                      label="Automatically adjust recipes to match default servings"
                    />
                  </div>
                  
                  <div className="settings-form-row">
                    <Checkbox 
                      id="allowRepeatRecipes" 
                      checked={settings.mealPlanning.allowRepeatRecipes}
                      onChange={(e) => updateMealPlanningSettings('allowRepeatRecipes', e.target.checked)}
                      label="Allow recipes to repeat within the same rotation period"
                    />
                  </div>
                </div>
              )}
              
              {/* Shopping Preferences Tab */}
              {activeTab === 'shopping' && (
                <div className="settings-tab-content">
                  <h2>Shopping Preferences</h2>
                  
                  <div className="settings-form-group">
                    <label htmlFor="preferredStore">Preferred Store</label>
                    <input 
                      type="text" 
                      id="preferredStore" 
                      className="settings-input"
                      value={settings.shopping.preferredStoreLocation}
                      onChange={(e) => updateShoppingSettings('preferredStoreLocation', e.target.value)}
                      placeholder="H-Mart"
                    />
                    <p className="settings-help-text">
                      Your preferred grocery store for Korean ingredients.
                    </p>
                  </div>
                  
                  <div className="settings-form-row">
                    <Checkbox 
                      id="combineIngredients" 
                      checked={settings.shopping.combineIngredients}
                      onChange={(e) => updateShoppingSettings('combineIngredients', e.target.checked)}
                      label="Combine similar ingredients in grocery list"
                    />
                  </div>
                  
                  <div className="settings-form-row">
                    <Checkbox 
                      id="categorizeGroceryList" 
                      checked={settings.shopping.categorizeGroceryList}
                      onChange={(e) => updateShoppingSettings('categorizeGroceryList', e.target.checked)}
                      label="Categorize grocery list by food type"
                    />
                  </div>
                  
                  <div className="settings-form-group">
                    <label>Regular Extra Items</label>
                    <TagInput 
                      tags={settings.shopping.addExtraItems} 
                      setTags={updateExtraItemsList}
                      placeholder="Add items you buy regularly"
                      maxTags={20}
                    />
                    <p className="settings-help-text">
                      Add items you regularly buy that should always be included in your grocery list.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Interface Preferences Tab */}
              {activeTab === 'interface' && (
                <div className="settings-tab-content">
                  <h2>User Interface Preferences</h2>
                  
                  <div className="settings-form-row">
                    <Checkbox 
                      id="darkMode" 
                      checked={settings.ui.darkMode}
                      onChange={(e) => updateUIPreference('darkMode', e.target.checked)}
                      label="Dark Mode"
                    />
                  </div>
                  
                  <div className="settings-form-group">
                    <label htmlFor="fontSize">Font Size</label>
                    <select 
                      id="fontSize" 
                      className="settings-select"
                      value={settings.ui.fontSize}
                      onChange={(e) => updateUIPreference('fontSize', e.target.value as FontSize)}
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                  
                  <div className="settings-form-row">
                    <Checkbox 
                      id="compactView" 
                      checked={settings.ui.compactView}
                      onChange={(e) => updateUIPreference('compactView', e.target.checked)}
                      label="Compact View"
                    />
                  </div>
                  
                  <div className="settings-form-row">
                    <Checkbox 
                      id="showNutritionalInfo" 
                      checked={settings.ui.showNutritionalInfo}
                      onChange={(e) => updateUIPreference('showNutritionalInfo', e.target.checked)}
                      label="Show Nutritional Information"
                    />
                  </div>
                  
                  <div className="settings-form-group">
                    <label htmlFor="language">Language</label>
                    <select 
                      id="language" 
                      className="settings-select"
                      value={settings.ui.language}
                      onChange={(e) => updateUIPreference('language', e.target.value as Language)}
                    >
                      <option value="english">English</option>
                      <option value="korean">Korean</option>
                    </select>
                    <p className="settings-help-text">
                      Note: Korean translations are coming soon.
                    </p>
                  </div>
                  
                  <div className="settings-form-row">
                    <Checkbox 
                      id="notificationsEnabled" 
                      checked={settings.ui.notificationsEnabled}
                      onChange={(e) => updateUIPreference('notificationsEnabled', e.target.checked)}
                      label="Enable Notifications"
                    />
                    <p className="settings-help-text">
                      You'll be notified when it's time to prepare meals based on your schedule.
                    </p>
                  </div>
                  
                  <div className="settings-form-group">
                    <label>Import & Export Settings</label>
                    <div className="settings-action-buttons">
                      <Button onClick={handleExport} variant="secondary" size="small">
                        Export Settings
                      </Button>
                      <Button onClick={handleImportClick} variant="secondary" size="small">
                        Import Settings
                      </Button>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept=".json"
                        onChange={handleFileChange}
                      />
                    </div>
                    <p className="settings-help-text">
                      Backup your settings or transfer them to another device.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter>
              <div className="settings-actions">
                <Button onClick={() => setShowResetConfirm(true)} variant="secondary">
                  Reset to Defaults
                </Button>
                <Button onClick={handleSave} variant="primary">
                  Save Settings
                </Button>
              </div>
            </CardFooter>
          </Card>
        </Section>
      </div>
    </Container>
  );
};

export default SettingsPage;