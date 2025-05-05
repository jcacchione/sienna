"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
// Settings page no longer uses Navbar
import Toast from '@/components/Toast';
import { Type, Palette, Bell, Volume2, Moon, Sun, Check } from 'lucide-react';

export default function Settings() {
  const [theme, setTheme] = useState('light');
  const [fontFamily, setFontFamily] = useState('poppins');
  const [enableReminders, setEnableReminders] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [toast, setToast] = useState<{show: boolean, message: string, type: 'success' | 'error' | 'info'}>({ 
    show: false, 
    message: '', 
    type: 'success' 
  });

  // Show toast notification
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ show: true, message, type });
    // Auto-hide toast after 3 seconds
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Apply settings to document and localStorage
  const applySettings = {
    theme: (value: string) => {
      document.documentElement.setAttribute('data-theme', value);
      localStorage.setItem('theme', value);
      showToast(`Theme changed to ${value}`);
    },
    fontFamily: (value: string) => {
      document.body.style.fontFamily = getFontFamily(value);
      localStorage.setItem('fontFamily', value);
      showToast(`Font changed to ${value}`);
    },
    reminders: (value: boolean) => {
      localStorage.setItem('enableReminders', value.toString());
      showToast(`Reminders ${value ? 'enabled' : 'disabled'}`);
    },
    soundAlerts: (value: boolean) => {
      localStorage.setItem('soundAlerts', value.toString());
      showToast(`Sound alerts ${value ? 'enabled' : 'disabled'}`);
    }
  };

  // Helper function for font settings
  const getFontFamily = (value: string): string => {
    switch (value) {
      case 'poppins': return 'var(--font-poppins, ui-sans-serif, system-ui, sans-serif)';
      case 'raleway': return 'var(--font-raleway, ui-sans-serif, system-ui, sans-serif)';
      case 'ubuntu': return 'var(--font-ubuntu, ui-sans-serif, system-ui, sans-serif)';
      default: return 'var(--font-poppins, ui-sans-serif, system-ui, sans-serif)';
    }
  };

  // Set initial settings on load
  useEffect(() => {
    // Get stored settings or use defaults
    const storedTheme = localStorage.getItem('theme') || 'light';
    const storedFontFamily = localStorage.getItem('fontFamily') || 'poppins';
    const storedReminders = localStorage.getItem('enableReminders') === 'false' ? false : true;
    const storedSoundAlerts = localStorage.getItem('soundAlerts') === 'true' ? true : false;
    
    // Update state
    setTheme(storedTheme);
    setFontFamily(storedFontFamily);
    setEnableReminders(storedReminders);
    setSoundAlerts(storedSoundAlerts);
    
    // Apply settings
    applySettings.theme(storedTheme);
    applySettings.fontFamily(storedFontFamily);
  }, []);

  // Event handlers
  const handleThemeChange = (value: string) => {
    setTheme(value);
    applySettings.theme(value);
  };

  const handleFontFamilyChange = (value: string) => {
    setFontFamily(value);
    applySettings.fontFamily(value);
  };

  const handleRemindersChange = (value: boolean) => {
    setEnableReminders(value);
    applySettings.reminders(value);
  };

  const handleSoundAlertsChange = (value: boolean) => {
    setSoundAlerts(value);
    applySettings.soundAlerts(value);
  };

  return (
    <main className="flex flex-col min-h-screen pb-16 bg-gray-50">
      <Header title="Settings" />

      <div className="flex-1 px-4 pt-4 pb-6">
        {/* Appearance Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-4 overflow-hidden">
          <div className="border-b border-gray-100 p-4">
            <div className="flex items-center gap-2">
              <div className="bg-orange-500/10 p-2 rounded-full">
                <Palette className="h-5 w-5 text-orange-500" />
              </div>
              <h2 className="font-medium text-lg">Appearance</h2>
            </div>
          </div>
          
          <div className="p-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleThemeChange('light')} 
                  className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border ${theme === 'light' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}
                >
                  <Sun className={`h-5 w-5 ${theme === 'light' ? 'text-orange-500' : 'text-gray-500'}`} />
                  <span className={theme === 'light' ? 'font-medium text-orange-500' : 'text-gray-700'}>Light</span>
                  {theme === 'light' && <Check className="h-4 w-4 text-orange-500 ml-1" />}
                </button>
                
                <button 
                  onClick={() => handleThemeChange('dark')} 
                  className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border ${theme === 'dark' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}
                >
                  <Moon className={`h-5 w-5 ${theme === 'dark' ? 'text-orange-500' : 'text-gray-500'}`} />
                  <span className={theme === 'dark' ? 'font-medium text-orange-500' : 'text-gray-700'}>Dark</span>
                  {theme === 'dark' && <Check className="h-4 w-4 text-orange-500 ml-1" />}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Text Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-4 overflow-hidden">
          <div className="border-b border-gray-100 p-4">
            <div className="flex items-center gap-2">
              <div className="bg-teal-500/10 p-2 rounded-full">
                <Type className="h-5 w-5 text-teal-500" />
              </div>
              <h2 className="font-medium text-lg">Text Settings</h2>
            </div>
          </div>
          
          <div className="p-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
              <div className="grid grid-cols-3 gap-3">
                {['poppins', 'raleway', 'ubuntu'].map(font => (
                  <button 
                    key={font}
                    onClick={() => handleFontFamilyChange(font)} 
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border ${fontFamily === font ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}`}
                  >
                    <span className={`text-base ${fontFamily === font ? 'font-medium text-teal-500' : 'text-gray-700'}`} style={{ fontFamily: getFontFamily(font) }}>
                      {font.charAt(0).toUpperCase() + font.slice(1)}
                    </span>
                    {fontFamily === font && <Check className="h-4 w-4 text-teal-500 mt-1" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-4 overflow-hidden">
          <div className="border-b border-gray-100 p-4">
            <div className="flex items-center gap-2">
              <div className="bg-amber-500/10 p-2 rounded-full">
                <Bell className="h-5 w-5 text-amber-500" />
              </div>
              <h2 className="font-medium text-lg">Notification Settings</h2>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">Enable Reminders</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={enableReminders} 
                  onChange={(e) => handleRemindersChange(e.target.checked)} 
                />
                <div className={`w-11 h-6 rounded-full peer ${enableReminders ? 'bg-amber-500' : 'bg-gray-300'} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
              </label>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center gap-3">
                <Volume2 className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700">Sound Alerts</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={soundAlerts} 
                  onChange={(e) => handleSoundAlertsChange(e.target.checked)} 
                />
                <div className={`w-11 h-6 rounded-full peer ${soundAlerts ? 'bg-amber-500' : 'bg-gray-300'} peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {/* No Navbar on Settings page as it's accessed via hamburger menu */}
      
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ show: false, message: '', type: 'success' })} 
        />
      )}
    </main>
  );
}
