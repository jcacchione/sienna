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

  // Calculate total due and paid amounts
  const totalDueSoon = dueSoonBills.reduce((sum, bill) => {
    const amount = parseFloat(bill.amount.replace('€', '').replace(',', ''));
    return isNaN(amount) ? sum : sum + amount;
  }, 0);

  const totalDueLater = dueLaterBills.reduce((sum, bill) => {
    const amount = parseFloat(bill.amount.replace('€', '').replace(',', ''));
    return isNaN(amount) ? sum : sum + amount;
  }, 0);

  const totalPaid = bills.filter(bill => bill.isPaid).reduce((sum, bill) => {
    const amount = parseFloat(bill.amount.replace('€', '').replace(',', ''));
    return isNaN(amount) ? sum : sum + amount;
  }, 0);
  
  // Get days until due for a bill
  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  // Separate bills into due soon (next 30 days) and due later (beyond 30 days)
  const dueSoonBills = bills.filter(bill => !bill.isPaid && getDaysUntilDue(bill.dueDate) <= 30 && getDaysUntilDue(bill.dueDate) >= 0);
  const dueLaterBills = bills.filter(bill => !bill.isPaid && getDaysUntilDue(bill.dueDate) > 30);
  const paidBills = bills.filter(bill => bill.isPaid);

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' });
  };
