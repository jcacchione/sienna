  return (
    <main className="flex flex-col min-h-screen pb-16 bg-gray-50">
      <Header title="Bills & Payments" />
      
      <div className="flex-1 px-4 pt-4 pb-6">
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
