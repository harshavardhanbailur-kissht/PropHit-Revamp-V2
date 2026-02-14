'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

// Flow State Types
interface FlowState {
  phone: string;
  isVerified: boolean;
  selectedSkills: string[];
  displayName: string;
  currentStep: number;
  kycMethod: 'video' | 'aadhaar' | null;
  kycComplete: boolean;
  panNumber: string;
  panMethod: 'manual' | 'ocr' | null;
  panComplete: boolean;
}

type FlowAction =
  | { type: 'SET_PHONE'; phone: string }
  | { type: 'VERIFY' }
  | { type: 'SET_SKILLS'; skills: string[] }
  | { type: 'TOGGLE_SKILL'; skillId: string }
  | { type: 'SET_NAME'; name: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: number }
  | { type: 'SET_KYC_METHOD'; method: 'video' | 'aadhaar' }
  | { type: 'COMPLETE_KYC' }
  | { type: 'SET_PAN_METHOD'; method: 'manual' | 'ocr' }
  | { type: 'SET_PAN_NUMBER'; pan: string }
  | { type: 'COMPLETE_PAN' }
  | { type: 'RESET' };

// Initial State
const initialState: FlowState = {
  phone: '',
  isVerified: false,
  selectedSkills: [],
  displayName: '',
  currentStep: 0,
  kycMethod: null,
  kycComplete: false,
  panNumber: '',
  panMethod: null,
  panComplete: false,
};

// Reducer
function flowReducer(state: FlowState, action: FlowAction): FlowState {
  switch (action.type) {
    case 'SET_PHONE':
      return { ...state, phone: action.phone };

    case 'VERIFY':
      return { ...state, isVerified: true };

    case 'SET_SKILLS':
      return { ...state, selectedSkills: action.skills };

    case 'TOGGLE_SKILL':
      const isSelected = state.selectedSkills.includes(action.skillId);
      return {
        ...state,
        selectedSkills: isSelected
          ? state.selectedSkills.filter(id => id !== action.skillId)
          : [...state.selectedSkills, action.skillId],
      };

    case 'SET_NAME':
      return { ...state, displayName: action.name };

    case 'NEXT_STEP':
      return { ...state, currentStep: state.currentStep + 1 };

    case 'PREV_STEP':
      return { ...state, currentStep: Math.max(0, state.currentStep - 1) };

    case 'GO_TO_STEP':
      return { ...state, currentStep: action.step };

    case 'SET_KYC_METHOD':
      return { ...state, kycMethod: action.method };

    case 'COMPLETE_KYC':
      return { ...state, kycComplete: true };

    case 'SET_PAN_METHOD':
      return { ...state, panMethod: action.method };

    case 'SET_PAN_NUMBER':
      return { ...state, panNumber: action.pan };

    case 'COMPLETE_PAN':
      return { ...state, panComplete: true };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

// Context
interface FlowContextType {
  state: FlowState;
  dispatch: React.Dispatch<FlowAction>;
  setPhone: (phone: string) => void;
  verify: () => void;
  toggleSkill: (skillId: string) => void;
  setName: (name: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  setKycMethod: (method: 'video' | 'aadhaar') => void;
  completeKyc: () => void;
  setPanMethod: (method: 'manual' | 'ocr') => void;
  setPanNumber: (pan: string) => void;
  completePan: () => void;
  reset: () => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

// Provider
export function FlowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(flowReducer, initialState);

  const value: FlowContextType = {
    state,
    dispatch,
    setPhone: (phone: string) => dispatch({ type: 'SET_PHONE', phone }),
    verify: () => dispatch({ type: 'VERIFY' }),
    toggleSkill: (skillId: string) => dispatch({ type: 'TOGGLE_SKILL', skillId }),
    setName: (name: string) => dispatch({ type: 'SET_NAME', name }),
    nextStep: () => dispatch({ type: 'NEXT_STEP' }),
    prevStep: () => dispatch({ type: 'PREV_STEP' }),
    goToStep: (step: number) => dispatch({ type: 'GO_TO_STEP', step }),
    setKycMethod: (method: 'video' | 'aadhaar') => dispatch({ type: 'SET_KYC_METHOD', method }),
    completeKyc: () => dispatch({ type: 'COMPLETE_KYC' }),
    setPanMethod: (method: 'manual' | 'ocr') => dispatch({ type: 'SET_PAN_METHOD', method }),
    setPanNumber: (pan: string) => dispatch({ type: 'SET_PAN_NUMBER', pan }),
    completePan: () => dispatch({ type: 'COMPLETE_PAN' }),
    reset: () => dispatch({ type: 'RESET' }),
  };

  return (
    <FlowContext.Provider value={value}>
      {children}
    </FlowContext.Provider>
  );
}

// Hook
export function useFlow() {
  const context = useContext(FlowContext);
  if (context === undefined) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
}
