import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import { Plus, ShoppingBag, Trash2, Edit, ChevronRight, ListChecks, Home, Utensils } from 'lucide-react';
import Link from 'next/link';

export default function Lists() {
  // Sample lists data for a new graduate
  const sampleLists = [
    {
      id: '1',
      title: 'Weekly Shop',
      description: 'Regular groceries and essentials',
      items: 14,
      icon: <ShoppingBag className="h-5 w-5" />,
      color: 'orange-500'
    },
    {
      id: '2',
      title: 'Flat Setup',
      description: 'Things I still need for my new place',
      items: 8,
      icon: <Home className="h-5 w-5" />,
      color: 'teal-500'
    },
    {
      id: '3',
      title: 'Meal Prep Sunday',
      description: 'Ingredients for weekly meal preparation',
      items: 10,
      icon: <Utensils className="h-5 w-5" />,
      color: 'amber-600'
    }
  ];

  return (
    <main className="flex flex-col min-h-screen pb-16 bg-gray-50">
      <Header title="My Lists" />
      
      <div className="flex-1 px-4 pt-4 pb-6">
        {/* Add new list button */}
        <div className="flex justify-end mb-6">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2">
            <Plus size={18} />
            New List
          </button>
        </div>
        
        {/* Lists grid */}
        <div className="grid grid-cols-1 gap-4">
          {sampleLists.map((list) => (
            <Link key={list.id} href={`/lists/${list.id}`}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:translate-y-[-1px] transition-all overflow-hidden cursor-pointer">
                <div className="flex items-stretch">
                  {/* Left color bar */}
                  <div className={`w-2 bg-${list.color}`}></div>
                  
                  {/* Content */}
                  <div className="p-4 flex-1">
                    <div>
                      <h2 className="font-medium text-lg">{list.title}</h2>
                      <p className="text-sm text-gray-500 mt-1">{list.description}</p>
                    </div>
                  </div>
                  
                  {/* Right icon */}
                  <div className="flex items-center pr-4">
                    <div className={`bg-${list.color} h-8 w-8 rounded-md flex items-center justify-center`}>
                      <ChevronRight className="text-white h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <Navbar />
    </main>
  );
}
