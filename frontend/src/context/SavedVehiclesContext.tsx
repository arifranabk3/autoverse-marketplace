'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vehicle } from '@/types';

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

export const SavedVehiclesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedIds, setSavedIds] = useState<string[]>(['veh-01', 'veh-03']);
  const [comparedIds, setComparedIds] = useState<string[]>(['veh-01', 'veh-02']);

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

