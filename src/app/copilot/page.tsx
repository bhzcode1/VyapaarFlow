'use client';

import { useAppState } from "@/lib/store";
import { useState } from "react";

export default function Copilot() {
  const { state, dispatch } = useAppState();
  const [input, setInput] = useState('');

  const suggestedPrompts = [
    "Where is my money stuck?",
    "What should I reorder?",
    "What should I promote?",
    "Find nearby merchants who need my stock",
    "What is my biggest opportunity?"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      // Add user message
      dispatch({ type: 'ADD_COPilot_MESSAGE', payload: { text: input, isUser: true } });

      // Generate AI response based on input
      let aiResponse = "";
      if (input.toLowerCase().includes("money stuck")) {
        aiResponse = "Your largest inventory opportunity is Lays.\n\nYou currently have 85 units while forecast demand is approximately 30 units.\n\nThat leaves an estimated surplus of 45 units.\n\nDaily Needs Store is approximately 2.1 km away and currently has an opportunity for additional Lays stock.\n\nI recommend either transferring part of the surplus or creating a promotional bundle.";
      } else if (input.toLowerCase().includes("reorder")) {
        aiResponse = "Based on current inventory levels and demand forecasts, I recommend reordering Coke.\n\nYou have 10 units in stock while forecast demand is 25 units with a safety stock of 5 units.\n\nThis leaves you with a potential stockout of 10 units.\n\nI suggest creating a reorder for 30 Coke units to replenish stock.";
      } else if (input.toLowerCase().includes("promote")) {
        aiResponse = "Lays is your best candidate for promotion.\n\nYou currently have 85 units in stock while forecast demand is only 30 units.\n\nThis gives you a surplus of 55 units that could be moved through promotional activities.\n\nConsider creating a bundle deal with Lays and another product to increase velocity.";
      } else if (input.toLowerCase().includes("nearby merchants")) {
        aiResponse = "FreshMart (1.2 km away) needs 20 Maggi units.\n\nCity Mart (3.4 km away) needs 15 Coke units.\n\nDaily Needs Store (2.1 km away) has 30 Lays units in excess.\n\nYou could transfer Maggi to FreshMart, Coke to City Mart, or Lays from Daily Needs Store.";
      } else if (input.toLowerCase().includes("biggest opportunity")) {
        aiResponse = "Your biggest opportunity is transferring Lays surplus to Daily Needs Store.\n\nYou have 85 units of Lays while forecast demand is 30 units.\n\nDaily Needs Store has excess capacity and is 2.1 km away.\n\nTransferring 30 units could generate an estimated benefit of ₹720.";
      } else {
        aiResponse = "I'm here to help you with inventory, sales, and merchant opportunities. Try asking about money stuck, reordering, promotions, nearby merchants, or your biggest opportunity.";
      }

      // Add AI response
      dispatch({ type: 'ADD_COPilot_MESSAGE', payload: { text: aiResponse, isUser: false } });

      // Clear input
      setInput('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">AI Copilot</h2>
        <p className="text-gray-600">
          Ask VyapaarFlow about your inventory, sales and merchant opportunities.
        </p>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-lg shadow flex flex-col h-96">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {state.copilot.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} mb-2`}>
              <div className={`max-w-xs px-3 py-2 rounded-md
                ${msg.isUser ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-900'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {state.copilot.messages.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
              <p>Start a conversation by asking a question below.</p>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex items-center p-4 border-t border-gray-200 bg-gray-50">
          <form onSubmit={handleSubmit} className="flex-1 space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask VyapaarFlow..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus-ring-primary"
            />
            <button
              type="submit"
              className="px-4 px-2 bg-primary text-primary-foreground hover:bg-primary/80 rounded-md"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Suggested Prompts */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-bold mb-3">Suggested prompts</h3>
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => {
                // Simulate clicking the prompt
                setInput(prompt);
                // Auto-submit after a brief delay
                setTimeout(() => {
                  const form = document.querySelector('form');
                  if (form) form.dispatchEvent(new Event('submit'));
                }, 100);
              }}
              className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}