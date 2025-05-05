"use client";

import React, { useState } from 'react';
import { ArrowLeft, Plus, Check, Trash2, ShoppingBag, Utensils, Home, ListChecks } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';

// Define the list item type
type ListItem = {
  id: string;
  name: string;
  checked: boolean;
  category?: string;
  brand?: string;
  promotion?: {
    store: 'Tesco' | 'Aldi' | 'Dunnes';
    text: string;
  };
};

// Define the list type
type List = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  items: ListItem[];
};

// Sample lists data with items for a new graduate - Irish brands and promotions
const listsData: Record<string, List> = {
  '1': {
    id: '1',
    title: 'Weekly Shop',
    description: 'Regular groceries and essentials',
    icon: <ShoppingBag className="h-5 w-5" />,
    color: 'orange-500',
    items: [
      { id: '101', name: 'Milk', checked: true, category: 'Dairy', brand: 'Avonmore' },
      { id: '102', name: 'Eggs', checked: true, category: 'Dairy', brand: 'Aldi Specially Selected', promotion: { store: 'Aldi', text: '2 for €6' } },
      { id: '103', name: 'Bread', checked: true, category: 'Bakery', brand: 'Brennans', promotion: { store: 'Tesco', text: '€1.50 each' } },
      { id: '104', name: 'Chicken Fillets', checked: false, category: 'Meat', brand: 'Dunnes Simply Better', promotion: { store: 'Dunnes', text: '3 for €10' } },
      { id: '105', name: 'Pasta', checked: false, category: 'Dry Goods', brand: 'Tesco Finest' },
      { id: '106', name: 'Pasta Sauce', checked: false, category: 'Canned Goods', brand: 'Dolmio', promotion: { store: 'Tesco', text: 'Buy 1 Get 1 Free' } },
      { id: '107', name: 'Frozen Pizza', checked: false, category: 'Frozen', brand: 'Aldi Carlos', promotion: { store: 'Aldi', text: '€2.99 each' } },
      { id: '108', name: 'Toilet Paper', checked: false, category: 'Household', brand: 'Tesco Everyday Value' },
      { id: '109', name: 'Washing Up Liquid', checked: false, category: 'Cleaning', brand: 'Fairy', promotion: { store: 'Dunnes', text: '30% Off' } },
      { id: '110', name: 'Instant Noodles', checked: false, category: 'Quick Meals', brand: 'Pot Noodle', promotion: { store: 'Tesco', text: '4 for €3' } },
      { id: '111', name: 'Coffee', checked: false, category: 'Beverages', brand: 'Dunnes St. Bernard' },
      { id: '112', name: 'Cereal', checked: false, category: 'Breakfast', brand: 'Kellogg\'s' },
      { id: '113', name: 'Crisps Multipack', checked: false, category: 'Snacks', brand: 'Tayto', promotion: { store: 'Dunnes', text: '€3 Only' } },
      { id: '114', name: 'Bin Bags', checked: false, category: 'Household', brand: 'Tesco' }
    ]
  },
  '2': {
    id: '2',
    title: 'Flat Setup',
    description: 'Things I still need for my new place',
    icon: <Home className="h-5 w-5" />,
    color: 'teal-500',
    items: [
      { id: '201', name: 'Desk Lamp', checked: false, category: 'Lighting', brand: 'Aldi Home', promotion: { store: 'Aldi', text: 'Special Buy €14.99' } },
      { id: '202', name: 'Bathroom Mat', checked: false, category: 'Home', brand: 'Dunnes Stores' },
      { id: '203', name: 'Laundry Basket', checked: true, category: 'Organization', brand: 'Tesco Home', promotion: { store: 'Tesco', text: 'Half Price' } },
      { id: '204', name: 'Extension Lead', checked: false, category: 'Electronics', brand: 'Argos' },
      { id: '205', name: 'Clothes Hangers', checked: false, category: 'Organization', brand: 'Dunnes', promotion: { store: 'Dunnes', text: '20 for €5' } },
      { id: '206', name: 'Doormat', checked: false, category: 'Home', brand: 'Aldi Home' },
      { id: '207', name: 'Shower Caddy', checked: false, category: 'Bathroom', brand: 'Tesco Home', promotion: { store: 'Tesco', text: '25% Off' } },
      { id: '208', name: 'Blackout Curtains', checked: false, category: 'Home', brand: 'Dunnes' }
    ]
  },
  '3': {
    id: '3',
    title: 'Meal Prep Sunday',
    description: 'Ingredients for weekly meal preparation',
    icon: <Utensils className="h-5 w-5" />,
    color: 'amber-600',
    items: [
      { id: '301', name: 'Chicken Breasts', checked: false, category: 'Protein', brand: 'Dunnes Simply Better', promotion: { store: 'Dunnes', text: '3 for €10' } },
      { id: '302', name: 'Brown Rice', checked: false, category: 'Grains', brand: 'Tesco Finest' },
      { id: '303', name: 'Broccoli', checked: false, category: 'Vegetables', brand: 'Aldi Fresh', promotion: { store: 'Aldi', text: '€1.29 each' } },
      { id: '304', name: 'Sweet Potatoes', checked: false, category: 'Vegetables', brand: 'Tesco Fresh', promotion: { store: 'Tesco', text: '1kg for €1.99' } },
      { id: '305', name: 'Meal Prep Containers', checked: false, category: 'Kitchen', brand: 'Dunnes Home' },
      { id: '306', name: 'Minced Beef', checked: false, category: 'Protein', brand: 'Aldi Specially Selected', promotion: { store: 'Aldi', text: '500g for €3.99' } },
      { id: '307', name: 'Bell Peppers', checked: false, category: 'Vegetables', brand: 'Dunnes Fresh' },
      { id: '308', name: 'Onions', checked: false, category: 'Vegetables', brand: 'Tesco Fresh' },
      { id: '309', name: 'Pasta', checked: false, category: 'Grains', brand: 'Tesco Finest', promotion: { store: 'Tesco', text: 'Buy 1 Get 1 Free' } },
      { id: '310', name: 'Canned Tomatoes', checked: false, category: 'Canned Goods', brand: 'Aldi Everyday Essentials' }
    ]
  },
  '4': {
    id: '4',
    title: 'Bills & Payments',
    description: 'Monthly expenses to track',
    icon: <ListChecks className="h-5 w-5" />,
    color: 'blue-500',
    items: [
      { id: '401', name: 'Rent', checked: true, category: 'Housing', brand: 'Monthly' },
      { id: '402', name: 'Electricity', checked: false, category: 'Utilities', brand: 'Electric Ireland' },
      { id: '403', name: 'Internet', checked: false, category: 'Utilities', brand: 'Eir' },
      { id: '404', name: 'Phone Bill', checked: false, category: 'Utilities', brand: 'Three' },
      { id: '405', name: 'TV License', checked: false, category: 'Government', brand: 'Annual' },
      { id: '406', name: 'Bin Collection', checked: false, category: 'Services', brand: 'Quarterly' }
    ]
  }
};

// Helper function to get the color for each store
const getStoreColor = (store: 'Tesco' | 'Aldi' | 'Dunnes'): string => {
  switch (store) {
    case 'Tesco':
      return 'bg-blue-100 text-blue-800';
    case 'Aldi':
      return 'bg-red-100 text-red-800';
    case 'Dunnes':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function ListDetail() {
  // Use the useParams hook to get the id parameter from the URL
  const params = useParams();
  const listId = params.id as string;
  const list = listsData[listId];
  
  // State for managing items
  const [items, setItems] = useState<ListItem[]>(list?.items || []);
  const [newItemName, setNewItemName] = useState('');
  
  // Handle item check/uncheck
  const toggleItemCheck = (itemId: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };
  
  // Handle adding a new item
  const addNewItem = () => {
    if (newItemName.trim() === '') return;
    
    const newItem: ListItem = {
      id: `new-${Date.now()}`,
      name: newItemName,
      checked: false
    };
    
    setItems(prevItems => [...prevItems, newItem]);
    setNewItemName('');
  };
  
  // Handle deleting an item
  const deleteItem = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  // If list not found
  if (!list) {
    return (
      <main className="flex flex-col min-h-screen p-4">
        <div className="flex items-center mb-6">
          <Link href="/lists" className="mr-4">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold">List Not Found</h1>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-gray-500 mb-4">The list you're looking for doesn't exist.</p>
          <Link href="/lists" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-sm transition-colors">
            Back to Lists
          </Link>
        </div>
      </main>
    );
  }
  
  return (
    <main className="flex flex-col min-h-screen pb-16 bg-gray-50">
      {/* Header */}
      <div className={`bg-${list.color} text-white p-4`}>
        <div className="flex items-center mb-2">
          <Link href="/lists" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-bold">{list.title}</h1>
        </div>
        <p className="text-white/80 text-sm">{list.description}</p>
      </div>
      
      {/* Add new item form */}
      <div className="px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add new item..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addNewItem()}
          />
          <button 
            onClick={addNewItem}
            className={`bg-${list.color} text-white p-2 rounded-lg`}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
      
      {/* List items */}
      <div className="flex-1 px-4 pt-4 pb-6">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-500">
            <p>No items in this list yet.</p>
            <p className="text-sm mt-1">Add your first item above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg border border-gray-200 p-3 flex items-start"
              >
                <button 
                  onClick={() => toggleItemCheck(item.id)}
                  className={`mr-3 flex-shrink-0 h-6 w-6 rounded-full border ${
                    item.checked 
                      ? `bg-${list.color} border-${list.color} flex items-center justify-center` 
                      : 'border-gray-300'
                  }`}
                >
                  {item.checked && <Check size={14} className="text-white" />}
                </button>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className={`font-medium ${item.checked ? 'line-through text-gray-400' : ''}`}>
                      {item.name}
                    </h3>
                    {item.promotion && (
                      <div className="flex items-center">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getStoreColor(item.promotion.store)}`}>
                          {item.promotion.store}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-1 text-xs">
                    {item.category && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{item.category}</span>
                    )}
                    {item.brand && (
                      <span className="text-gray-500">{item.brand}</span>
                    )}
                    {item.promotion && (
                      <span className="font-medium text-green-600">{item.promotion.text}</span>
                    )}
                  </div>
                </div>
                
                <button 
                  onClick={() => deleteItem(item.id)}
                  className="ml-2 text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Navbar />
    </main>
  );
}
