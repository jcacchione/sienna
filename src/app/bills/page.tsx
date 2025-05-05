'use client';

import { useState } from 'react';
import { AlertCircle, Calendar, CheckCircle, Trash2, Plus, Search } from 'lucide-react';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';

// Define the bill item type
type BillItem = {
  id: string;
  name: string;
  amount: string;
  dueDate: string;
  category: string;
  isPaid: boolean;
  provider: string;
  isRecurring: boolean;
  frequency?: string;
};

export default function Bills() {
  // Tab state
  const [activeTab, setActiveTab] = useState<'due-soon' | 'upcoming' | 'paid'>('due-soon');
  
  // Search and sort state for paid bills
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  
  // Sample bills data
  const [bills, setBills] = useState<BillItem[]>([
    { 
      id: '1', 
      name: 'Rent', 
      amount: '€850', 
      dueDate: '2025-05-01', 
      category: 'Housing', 
      isPaid: true, 
      provider: 'Landlord',
      isRecurring: true,
      frequency: 'Monthly'
    },
    { 
      id: '2', 
      name: 'Electricity', 
      amount: '€78.50', 
      dueDate: '2025-05-15', 
      category: 'Utilities', 
      isPaid: false, 
      provider: 'Electric Ireland',
      isRecurring: true,
      frequency: 'Monthly'
    },
    { 
      id: '3', 
      name: 'Internet', 
      amount: '€45', 
      dueDate: '2025-05-20', 
      category: 'Utilities', 
      isPaid: false, 
      provider: 'Eir',
      isRecurring: true,
      frequency: 'Monthly'
    },
    { 
      id: '4', 
      name: 'Phone Bill', 
      amount: '€35', 
      dueDate: '2025-05-22', 
      category: 'Utilities', 
      isPaid: false, 
      provider: 'Three',
      isRecurring: true,
      frequency: 'Monthly'
    },
    { 
      id: '5', 
      name: 'TV License', 
      amount: '€160', 
      dueDate: '2025-08-15', 
      category: 'Government', 
      isPaid: false, 
      provider: 'An Post',
      isRecurring: true,
      frequency: 'Annual'
    },
    { 
      id: '6', 
      name: 'Bin Collection', 
      amount: '€75', 
      dueDate: '2025-07-01', 
      category: 'Services', 
      isPaid: false, 
      provider: 'Greyhound',
      isRecurring: true,
      frequency: 'Quarterly'
    },
    { 
      id: '7', 
      name: 'Water Charges', 
      amount: '€89.50', 
      dueDate: '2025-04-10', 
      category: 'Utilities', 
      isPaid: true, 
      provider: 'Irish Water',
      isRecurring: true,
      frequency: 'Quarterly'
    },
    { 
      id: '8', 
      name: 'Home Insurance', 
      amount: '€235', 
      dueDate: '2025-04-05', 
      category: 'Insurance', 
      isPaid: true, 
      provider: 'Zurich',
      isRecurring: true,
      frequency: 'Annual'
    }
  ]);

  // State for new bill form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBill, setNewBill] = useState<Partial<BillItem>>({
    name: '',
    amount: '',
    dueDate: '',
    category: 'Utilities',
    isPaid: false,
    provider: '',
    isRecurring: true,
    frequency: 'Monthly'
  });

  // Toggle bill paid status
  const togglePaidStatus = (id: string) => {
    setBills(prevBills => 
      prevBills.map(bill => 
        bill.id === id ? { ...bill, isPaid: !bill.isPaid } : bill
      )
    );
  };

  // Delete a bill
  const deleteBill = (id: string) => {
    setBills(prevBills => prevBills.filter(bill => bill.id !== id));
  };

  // Add a new bill
  const addNewBill = () => {
    if (!newBill.name || !newBill.amount || !newBill.dueDate) return;
    
    const bill: BillItem = {
      id: `new-${Date.now()}`,
      name: newBill.name || '',
      amount: newBill.amount || '',
      dueDate: newBill.dueDate || '',
      category: newBill.category || 'Utilities',
      isPaid: false,
      provider: newBill.provider || '',
      isRecurring: newBill.isRecurring || false,
      frequency: newBill.isRecurring ? (newBill.frequency || 'Monthly') : undefined
    };
    
    setBills(prevBills => [...prevBills, bill]);
    setNewBill({
      name: '',
      amount: '',
      dueDate: '',
      category: 'Utilities',
      isPaid: false,
      provider: '',
      isRecurring: true,
      frequency: 'Monthly'
    });
    setShowAddForm(false);
  };

  // Get days until due for a bill
  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  // Calculate total due and paid amounts
  const totalDueSoon = bills.filter(bill => !bill.isPaid && getDaysUntilDue(bill.dueDate) <= 30 && getDaysUntilDue(bill.dueDate) >= 0).reduce((sum, bill) => {
    const amount = parseFloat(bill.amount.replace('€', '').replace(',', ''));
    return isNaN(amount) ? sum : sum + amount;
  }, 0);

  const totalDueLater = bills.filter(bill => !bill.isPaid && getDaysUntilDue(bill.dueDate) > 30).reduce((sum, bill) => {
    const amount = parseFloat(bill.amount.replace('€', '').replace(',', ''));
    return isNaN(amount) ? sum : sum + amount;
  }, 0);

  const totalPaid = bills.filter(bill => bill.isPaid).reduce((sum, bill) => {
    const amount = parseFloat(bill.amount.replace('€', '').replace(',', ''));
    return isNaN(amount) ? sum : sum + amount;
  }, 0);
  
  // Separate bills into due soon (next 30 days) and due later (beyond 30 days)
  const dueSoonBills = bills.filter(bill => !bill.isPaid && getDaysUntilDue(bill.dueDate) <= 30 && getDaysUntilDue(bill.dueDate) >= 0);
  const dueLaterBills = bills.filter(bill => !bill.isPaid && getDaysUntilDue(bill.dueDate) > 30);
  const paidBills = bills.filter(bill => bill.isPaid);

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="flex flex-col min-h-screen pb-16 bg-gray-50">
      <Header title="Bills & Payments" />
      
      <div className="flex-1 px-4 pt-4 pb-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {activeTab === 'paid' ? (
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 col-span-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Total Paid</span>
                  <span className="text-xl font-semibold text-green-500">€{totalPaid.toFixed(2)}</span>
                  <span className="text-xs text-gray-500 mt-1">
                    {paidBills.length} {paidBills.length === 1 ? 'bill' : 'bills'} paid
                  </span>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Due Soon</span>
                    <span className="text-xl font-semibold text-red-500">€{totalDueSoon.toFixed(2)}</span>
                  </div>
                  <div className="bg-red-100 p-2 rounded-full">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Due Later</span>
                    <span className="text-xl font-semibold text-blue-500">€{totalDueLater.toFixed(2)}</span>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Add bill button */}
        <div className="flex justify-end mb-6">
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            {showAddForm ? 'Cancel' : 'New Bill'}
          </button>
        </div>
        
        {/* Add bill form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
            <h2 className="text-lg font-medium mb-4">Add New Bill</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bill Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newBill.name}
                  onChange={(e) => setNewBill({...newBill, name: e.target.value})}
                  placeholder="e.g. Electricity"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newBill.amount}
                  onChange={(e) => setNewBill({...newBill, amount: e.target.value})}
                  placeholder="e.g. €50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newBill.dueDate}
                  onChange={(e) => setNewBill({...newBill, dueDate: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newBill.category}
                  onChange={(e) => setNewBill({...newBill, category: e.target.value})}
                >
                  <option value="Housing">Housing</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Services">Services</option>
                  <option value="Government">Government</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newBill.provider}
                  onChange={(e) => setNewBill({...newBill, provider: e.target.value})}
                  placeholder="e.g. Electric Ireland"
                />
              </div>
              
              <div className="col-span-2">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="isRecurring"
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                    checked={newBill.isRecurring}
                    onChange={(e) => setNewBill({...newBill, isRecurring: e.target.checked})}
                  />
                  <label htmlFor="isRecurring" className="ml-2 block text-sm text-gray-700">
                    Recurring Bill
                  </label>
                </div>
                
                {newBill.isRecurring && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newBill.frequency}
                      onChange={(e) => setNewBill({...newBill, frequency: e.target.value})}
                    >
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Annual">Annual</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={addNewBill}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
              >
                Save Bill
              </button>
            </div>
          </div>
        )}
        
        {/* Tab navigation */}
        <div className="flex border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab('due-soon')}
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'due-soon' 
              ? 'text-amber-600 border-b-2 border-amber-600' 
              : 'text-gray-500 hover:text-gray-700'}`}
          >
            Due Soon ({dueSoonBills.length})
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'upcoming' 
              ? 'text-amber-600 border-b-2 border-amber-600' 
              : 'text-gray-500 hover:text-gray-700'}`}
          >
            Due Later ({dueLaterBills.length})
          </button>
          <button
            onClick={() => setActiveTab('paid')}
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'paid' 
              ? 'text-amber-600 border-b-2 border-amber-600' 
              : 'text-gray-500 hover:text-gray-700'}`}
          >
            Paid History ({paidBills.length})
          </button>
        </div>
        
        {/* Bills list based on active tab */}
        {activeTab === 'due-soon' && (
          <>
            {dueSoonBills.length === 0 ? (
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center text-gray-500">
                No bills due in the next 30 days. Check the Future Bills tab for later payments.
              </div>
            ) : (
              <div>
                {dueSoonBills.map((bill) => {
                  const daysUntil = getDaysUntilDue(bill.dueDate);
                  let statusColor = "bg-yellow-100 text-yellow-800";
                  if (daysUntil < 0) statusColor = "bg-red-100 text-red-800";
                  else if (daysUntil < 3) statusColor = "bg-orange-100 text-orange-800";
                  else if (daysUntil > 7) statusColor = "bg-green-100 text-green-800";
                  
                  return (
                    <div 
                      key={bill.id} 
                      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-4"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-lg">{bill.name}</h3>
                            <p className="text-sm text-gray-500">{bill.provider}</p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-lg font-semibold text-gray-800">{bill.amount}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                            {bill.category}
                          </span>
                          {bill.isRecurring && (
                            <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                              {bill.frequency}
                            </span>
                          )}
                          <span className={`${statusColor} px-2 py-0.5 rounded-full text-xs`}>
                            {daysUntil < 0 
                              ? `Overdue by ${Math.abs(daysUntil)} days` 
                              : daysUntil === 0 
                                ? "Due today" 
                                : `Due in ${daysUntil} days`
                            }
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{formatDate(bill.dueDate)}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => togglePaidStatus(bill.id)}
                              className="bg-green-500 hover:bg-green-600 text-white p-1.5 rounded-md"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button 
                              onClick={() => deleteBill(bill.id)}
                              className="bg-red-100 hover:bg-red-200 text-red-500 p-1.5 rounded-md"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
        
        {activeTab === 'upcoming' && (
          <>
            {dueLaterBills.length === 0 ? (
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center text-gray-500">
                No future bills scheduled beyond 30 days.
              </div>
            ) : (
              <div>
                {dueLaterBills.map((bill) => {
                  const daysUntil = getDaysUntilDue(bill.dueDate);
                  
                  return (
                    <div 
                      key={bill.id} 
                      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-4"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-lg">{bill.name}</h3>
                            <p className="text-sm text-gray-500">{bill.provider}</p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-lg font-semibold text-gray-800">{bill.amount}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                            {bill.category}
                          </span>
                          {bill.isRecurring && (
                            <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                              {bill.frequency}
                            </span>
                          )}
                          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                            Due in {daysUntil} days
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{formatDate(bill.dueDate)}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => togglePaidStatus(bill.id)}
                              className="bg-green-500 hover:bg-green-600 text-white p-1.5 rounded-md"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button 
                              onClick={() => deleteBill(bill.id)}
                              className="bg-red-100 hover:bg-red-200 text-red-500 p-1.5 rounded-md"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
        
        {activeTab === 'paid' && (
          <>
            {/* Search for paid bills */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search paid bills..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Search className="h-5 w-5" />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Paid bills list */}
            {paidBills.length === 0 ? (
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center text-gray-500">
                No paid bills to display.
              </div>
            ) : (
              <div>
                {paidBills
                  .filter(bill => {
                    if (!searchQuery) return true;
                    const query = searchQuery.toLowerCase();
                    return (
                      bill.name.toLowerCase().includes(query) ||
                      bill.provider.toLowerCase().includes(query) ||
                      bill.category.toLowerCase().includes(query)
                    );
                  })
                  .sort((a, b) => {
                    const dateA = new Date(a.dueDate).getTime();
                    const dateB = new Date(b.dueDate).getTime();
                    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
                  })
                  .map(bill => (
                    <div 
                      key={bill.id} 
                      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-4"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-lg">{bill.name}</h3>
                            <p className="text-sm text-gray-500">{bill.provider}</p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-lg font-semibold text-gray-800">{bill.amount}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                            {bill.category}
                          </span>
                          {bill.isRecurring && (
                            <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                              {bill.frequency}
                            </span>
                          )}
                          <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                            <CheckCircle size={10} />
                            Paid
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{formatDate(bill.dueDate)}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => togglePaidStatus(bill.id)}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-1.5 rounded-md"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button 
                              onClick={() => deleteBill(bill.id)}
                              className="bg-red-100 hover:bg-red-200 text-red-500 p-1.5 rounded-md"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
      
      <Navbar />
    </div>
  );
}