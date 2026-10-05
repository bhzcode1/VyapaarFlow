'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import * as React from 'react';

// Define the state shape
interface State {
  inventory: InventoryItem[];
  sales: SalesData;
  opportunities: Opportunity[];
  merchants: Merchant[];
  transfers: Transfer[];
  copilot: CopilotState;
  reports: ReportsData;
}

// Define the types for each part
interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  forecastDemand: number;
  safetyStock: number;
  status: 'Healthy' | 'Low' | 'Surplus';
  recommendedAction: 'HOLD' | 'BUY' | 'TRANSFER' | 'PROMOTE';
}

interface SalesData {
  today: number;
  week: number;
  month: number;
  grossProfit: number;
}

interface Opportunity {
  id: string;
  action: 'BUY' | 'TRANSFER' | 'PROMOTE' | 'HOLD';
  product: string;
  recommendation: string;
  reason: string;
  expectedBenefit: number;
  confidence: number;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH';
  distance?: number; // in km
}

interface Merchant {
  id: string;
  name: string;
  distance: number; // in km
  needs: Array<{ product: string; quantity: number }>;
  excess: Array<{ product: string; quantity: number }>;
  status: 'Demand' | 'Surplus';
}

interface Transfer {
  id: string;
  product: string;
  quantity: number;
  from: string;
  to: string;
  distance: number; // in km
  status: 'PROPOSED' | 'ACCEPTED' | 'IN_TRANSIT' | 'COMPLETED';
  estimatedBenefit: number;
}

interface CopilotState {
  messages: Array<{ id: string; text: string; isUser: boolean }>;
}

interface ReportsData {
  inventoryValue: number;
  stockoutRisk: number; // number of products at risk
  excessInventory: number; // total units of excess
  salesGrowth: number; // percentage
  grossProfit: number;
  merchantTransfers: number;
}

// Initial state
const initialState: State = {
  inventory: [
    { id: '1', name: 'Maggi', currentStock: 22, forecastDemand: 20, safetyStock: 10, status: 'Healthy', recommendedAction: 'HOLD' },
    { id: '2', name: 'Coke', currentStock: 10, forecastDemand: 25, safetyStock: 5, status: 'Low', recommendedAction: 'BUY' },
    { id: '3', name: 'Lays', currentStock: 85, forecastDemand: 30, safetyStock: 10, status: 'Surplus', recommendedAction: 'TRANSFER' },
    { id: '4', name: 'Parle-G', currentStock: 25, forecastDemand: 20, safetyStock: 5, status: 'Healthy', recommendedAction: 'HOLD' },
    { id: '5', name: 'Sprite', currentStock: 8, forecastDemand: 18, safetyStock: 5, status: 'Low', recommendedAction: 'BUY' },
  ],
  sales: {
    today: 8200,
    week: 52400,
    month: 218600,
    grossProfit: 1840,
  },
  opportunities: [
    {
      id: 'opp1',
      action: 'TRANSFER',
      product: 'Maggi',
      recommendation: 'Transfer 20 Maggi units to FreshMart',
      reason: 'FreshMart is predicted to need additional Maggi units while Sharma Stores has available stock.',
      expectedBenefit: 480,
      confidence: 91,
      urgency: 'HIGH',
      distance: 1.2,
    },
    {
      id: 'opp2',
      action: 'BUY',
      product: 'Coke',
      recommendation: 'Create Reorder for 30 Coke units',
      reason: 'Coke demand is rising faster than current inventory.',
      expectedBenefit: 0, // for BUY, benefit is cost avoided?
      confidence: 85,
      urgency: 'HIGH',
    },
    {
      id: 'opp3',
      action: 'PROMOTE',
      product: 'Lays',
      recommendation: 'Create Promotional Bundle for Lays',
      reason: 'Lays is showing slower sales velocity compared with last week.',
      expectedBenefit: 0, // for PROMOTE, benefit is incremental revenue?
      confidence: 78,
      urgency: 'MEDIUM',
    },
    {
      id: 'opp4',
      action: 'HOLD',
      product: 'Parle-G',
      recommendation: 'Hold current stock',
      reason: 'Parle-G stock is healthy and demand is stable.',
      expectedBenefit: 0,
      confidence: 95,
      urgency: 'LOW',
    },
  ],
  merchants: [
    {
      id: 'm1',
      name: 'FreshMart',
      distance: 1.2,
      needs: [{ product: 'Maggi', quantity: 20 }],
      excess: [],
      status: 'Demand',
    },
    {
      id: 'm2',
      name: 'Daily Needs Store',
      distance: 2.1,
      needs: [],
      excess: [{ product: 'Lays', quantity: 30 }],
      status: 'Surplus',
    },
    {
      id: 'm3',
      name: 'City Mart',
      distance: 3.4,
      needs: [{ product: 'Coke', quantity: 15 }],
      excess: [],
      status: 'Demand',
    },
  ],
  transfers: [
    {
      id: 'TR-001',
      product: 'Maggi',
      quantity: 20,
      from: 'Sharma Stores',
      to: 'FreshMart',
      distance: 1.2,
      status: 'PROPOSED',
      estimatedBenefit: 480,
    },
  ],
  copilot: {
    messages: [],
  },
  reports: {
    inventoryValue: 42500,
    stockoutRisk: 2,
    excessInventory: 45,
    salesGrowth: 12,
    grossProfit: 1840,
    merchantTransfers: 3,
  },
};

// Action types
type Action =
  | { type: 'UPDATE_INVENTORY'; payload: InventoryItem[] }
  | { type: 'UPDATE_SALES'; payload: SalesData }
  | { type: 'UPDATE_OPPORTUNITIES'; payload: Opportunity[] }
  | { type: 'UPDATE_MERCHANTS'; payload: Merchant[] }
  | { type: 'UPDATE_TRANSFERS'; payload: Transfer[] }
  | { type: 'ADD_COPilot_MESSAGE'; payload: { text: string; isUser: boolean } }
  | { type: 'UPDATE_REPORTS'; payload: ReportsData }
  | { type: 'UPDATE_TRANSFER_STATUS'; payload: { id: string; status: Transfer['status'] } }
  | { type: 'ADD_TRANSFER'; payload: Transfer };

// Reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_INVENTORY':
      return { ...state, inventory: action.payload };
    case 'UPDATE_SALES':
      return { ...state, sales: action.payload };
    case 'UPDATE_OPPORTUNITIES':
      return { ...state, opportunities: action.payload };
    case 'UPDATE_MERCHANTS':
      return { ...state, merchants: action.payload };
    case 'UPDATE_TRANSFERS':
      return { ...state, transfers: action.payload };
    case 'ADD_COPilot_MESSAGE':
      return {
        ...state,
        copilot: {
          ...state.copilot,
          messages: [
            ...state.copilot.messages,
            {
              id: Math.random().toString(36).substr(2, 9),
              text: action.payload.text,
              isUser: action.payload.isUser,
            }
          ],
        },
      };
    case 'UPDATE_REPORTS':
      return { ...state, reports: action.payload };
    case 'UPDATE_TRANSFER_STATUS':
      return {
        ...state,
        transfers: state.transfers.map((t) =>
          t.id === action.payload.id ? { ...t, status: action.payload.status } : t
        ),
      };
    case 'ADD_TRANSFER':
      return {
        ...state,
        transfers: [...state.transfers, action.payload],
      };
    default:
      return state;
  }
}

const StateContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return React.createElement(StateContext.Provider, { value }, children);
};

export const useAppState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used within a StateProvider');
  }
  return context;
};