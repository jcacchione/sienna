          {/* Paid Tab */}
          {activeTab === 'paid' && (
            <div>
              {/* Summary card - single card with total paid */}
              <div className="grid grid-cols-1 gap-3 mb-6">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Total Paid</h3>
                  <span className="text-2xl font-bold text-green-500">€{totalPaid.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Search and sort controls */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search paid bills..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Sort:</span>
                    <select
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        bill.category.toLowerCase().includes(query) ||
                        bill.amount.toLowerCase().includes(query)
                      );
                    })
                    .sort((a, b) => {
                      const dateA = new Date(a.dueDate).getTime();
                      const dateB = new Date(b.dueDate).getTime();
                      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
                    })
                    .map((bill) => (
                      <div 
                        key={bill.id} 
                        className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-4"
                      >
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium text-lg line-through">{bill.name}</h3>
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
                            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
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
                                className="bg-gray-200 hover:bg-gray-300 text-gray-600 p-1.5 rounded-md"
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
            </div>
          )}
        </div>
      </div>
      
      <Navbar />
    </main>
  );
}
