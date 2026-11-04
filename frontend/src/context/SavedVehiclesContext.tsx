'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SavedVehiclesContextType {
  savedIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  comparedIds: string[];
  toggleCompare: (id: string) => void;
  isCompared: (id: string) => boolean;
  clearCompared: () => void;
}

const SavedVehiclesContext = createContext<SavedVehiclesContextType | undefined>(undefined);

const STORAGE_KEY_SAVED = 'autoverse_favorites_v1';
const STORAGE_KEY_COMPARE = 'autoverse_compare_v1';

export const SavedVehiclesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedIds, setSavedIds] = useState<string[]>(['veh-01', 'veh-03']);
  const [comparedIds, setComparedIds] = useState<string[]>(['veh-01', 'veh-02']);
  const [isLoaded, setIsLoaded] = useState(false);

  // Restore from localStorage upon browser mount
  useEffect(() => {
    try {
      const storedSaved = localStorage.getItem(STORAGE_KEY_SAVED);
      if (storedSaved) {
        setSavedIds(JSON.parse(storedSaved));
      }
      const storedCompare = localStorage.getItem(STORAGE_KEY_COMPARE);
      if (storedCompare) {
        setComparedIds(JSON.parse(storedCompare));
      }
    } catch (e) {
      console.warn('LocalStorage access issue:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(savedIds));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [savedIds, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_COMPARE, JSON.stringify(comparedIds));
    } catch (e) {
      console.warn('LocalStorage compare save error:', e);
    }
  }, [comparedIds, isLoaded]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const isSaved = (id: string) => savedIds.includes(id);

  const toggleCompare = (id: string) => {
    setComparedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 vehicles simultaneously.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const isCompared = (id: string) => comparedIds.includes(id);

  const clearCompared = () => setComparedIds([]);

  return (
    <SavedVehiclesContext.Provider
      value={{
        savedIds,
        toggleSave,
        isSaved,
        comparedIds,
        toggleCompare,
        isCompared,
        clearCompared,
      }}
    >
      {children}
    </SavedVehiclesContext.Provider>
  );
};

export const useSavedVehicles = () => {
  const context = useContext(SavedVehiclesContext);
  if (!context) {
    throw new Error('useSavedVehicles must be used within a SavedVehiclesProvider');
  }
  return context;
};
