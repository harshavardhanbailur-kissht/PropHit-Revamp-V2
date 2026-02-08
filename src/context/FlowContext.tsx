'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

// Flow State Types
interface FlowState {
  phone: string;
  isVerified: boolean;
  selectedSkills: string[];
  displayName: string;
  currentStep: number;
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
  | { type: 'RESET' };

// Initial State
const initialState: FlowState = {
  phone: '',
  isVerified: false,
  selectedSkills: [],
  displayName: '',
  currentStep: 0,
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
