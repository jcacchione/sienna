          {/* Upcoming Tab */}
          {activeTab === 'upcoming' && (
            <div>
              {/* Summary cards */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Due Soon</h3>
                  <span className="text-2xl font-bold text-red-500">€{totalDueSoon.toFixed(2)}</span>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Due Later</h3>
                  <span className="text-2xl font-bold text-blue-500">€{totalDueLater.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Due soon section */}
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <AlertCircle size={18} className="text-red-500" />
                  Due Soon
                </h2>
                
                {dueSoonBills.length === 0 ? (
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center text-gray-500">
                    No bills due soon. You're all caught up!
                  </div>
                ) : (
                  <div>
                    {dueSoonBills.map((bill) => (
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
                            {getDaysUntilDue(bill.dueDate) <= 7 && (
                              <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                                <AlertCircle size={10} />
                                Due soon
                              </span>
                            )}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{formatDate(bill.dueDate)}</span>
                            </div>
                            
                            <div className="flex gap-2">
                              <button 
                                onClick={() => togglePaidStatus(bill.id)}
                                className="bg-green-100 hover:bg-green-200 text-green-600 p-1.5 rounded-md"
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
              
              {/* Due later section */}
              <div>
                <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <Calendar size={18} className="text-blue-500" />
                  Due Later
                </h2>
                
                {dueLaterBills.length === 0 ? (
                  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center text-gray-500">
                    No upcoming bills scheduled.
                  </div>
                ) : (
                  <div>
                    {dueLaterBills.map((bill) => (
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
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{formatDate(bill.dueDate)}</span>
                            </div>
                            
                            <div className="flex gap-2">
                              <button 
                                onClick={() => togglePaidStatus(bill.id)}
                                className="bg-green-100 hover:bg-green-200 text-green-600 p-1.5 rounded-md"
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
            </div>
          )}
