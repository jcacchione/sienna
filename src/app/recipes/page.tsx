"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import { Search, ChefHat, Clock, Users, ChevronRight, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Recipe = {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  color: string;
  category?: string[];
  image: string;
  favorite?: boolean;
};

export default function Recipes() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  
  // Toggle favorite status for a recipe
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to recipe detail
    e.stopPropagation(); // Stop event from bubbling up to parent elements
    
    // Update state
    let newFavoriteStatus = false;
    setRecipes(prevRecipes => {
      const updatedRecipes = prevRecipes.map(recipe => {
        if (recipe.id === id) {
          newFavoriteStatus = !recipe.favorite;
          return { ...recipe, favorite: newFavoriteStatus };
        }
        return recipe;
      });
      return updatedRecipes;
    });
    
    // Update localStorage
    setTimeout(() => {
      const storedFavorites = localStorage.getItem('favoriteRecipes');
      let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      
      if (newFavoriteStatus) {
        // Add to favorites if not already there
        if (!favorites.includes(id)) {
          favorites.push(id);
        }
      } else {
        // Remove from favorites
        favorites = favorites.filter((favId: string) => favId !== id);
      }
      
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    }, 0);
  };
  // Sample recipes data
  const sampleRecipes = [
    {
      id: '1',
      title: 'Creamy Bacon Tagliatelle',
      description: 'Rich pasta with bacon in a creamy sauce',
      prepTime: '10 mins',
      cookTime: '15 mins',
      servings: 2,
      difficulty: 'Easy',
      color: 'teal-500',
      category: ['Quick', 'Budget'],
      image: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '2',
      title: 'Quick Vegetable Stir Fry',
      description: 'Colorful vegetables in a savory sauce over rice',
      prepTime: '15 mins',
      cookTime: '10 mins',
      servings: 2,
      difficulty: 'Easy',
      color: 'orange-500',
      category: ['Quick', 'Vegetarian'],
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '3',
      title: 'Simple Chicken Curry',
      description: 'Tender chicken in a rich, aromatic curry sauce',
      prepTime: '20 mins',
      cookTime: '30 mins',
      servings: 4,
      difficulty: 'Medium',
      color: 'amber-600',
      category: ['Budget'],
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '4',
      title: 'Quick Homemade Fries',
      description: 'Crispy french fries ready in minutes',
      prepTime: '5 mins',
      cookTime: '15 mins',
      servings: 2,
      difficulty: 'Easy',
      color: 'teal-500',
      category: ['Quick', 'Budget', 'Beginner'],
      image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '5',
      title: 'Avocado Toast',
      description: 'Simple, nutritious breakfast or snack',
      prepTime: '5 mins',
      cookTime: '2 mins',
      servings: 1,
      difficulty: 'Easy',
      color: 'green-500',
      category: ['Quick', 'Vegetarian', 'Beginner'],
      image: 'https://images.pexels.com/photos/1824353/pexels-photo-1824353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '6',
      title: 'One-Pot Lentil Soup',
      description: 'Hearty, nutritious soup that&apos;s budget-friendly',
      prepTime: '10 mins',
      cookTime: '30 mins',
      servings: 4,
      difficulty: 'Easy',
      color: 'orange-500',
      category: ['Budget', 'Vegetarian'],
      image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: '7',
      title: 'Sheet Pan Roasted Vegetables',
      description: 'Easy, versatile side dish or main course',
      prepTime: '15 mins',
      cookTime: '25 mins',
      servings: 4,
      difficulty: 'Easy',
      color: 'green-500',
      category: ['Budget', 'Vegetarian', 'Beginner'],
      image: 'https://images.pexels.com/photos/6316515/pexels-photo-6316515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },

  ];

  // Initialize recipes from sample data and check favorites
  useEffect(() => {
    // Get favorite recipes from localStorage
    const storedFavorites = localStorage.getItem('favoriteRecipes');
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    
    // Set recipes with favorite status
    setRecipes(sampleRecipes.map(recipe => ({
      ...recipe,
      favorite: favorites.includes(recipe.id)
    })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex flex-col min-h-screen pb-16 bg-gray-50">
      <Header title="Recipes" />
      
      <div className="flex-1 px-4 pt-4 pb-6">
        <div className="flex flex-col gap-4 mb-6">
          {/* Search bar */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search recipes..." 
              className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
          </div>
          
          {/* Filter buttons */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button 
              onClick={() => setActiveCategory('All')} 
              className={`${activeCategory === 'All' ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 border border-gray-200'} px-4 py-1.5 rounded-full text-sm font-medium shadow-sm`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveCategory('Favorites')} 
              className={`${activeCategory === 'Favorites' ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 border border-gray-200'} px-4 py-1.5 rounded-full text-sm font-medium shadow-sm flex items-center gap-1`}
            >
              <Heart size={14} className="fill-current" />
              Favorites
            </button>
            <button 
              onClick={() => setActiveCategory('Quick')} 
              className={`${activeCategory === 'Quick' ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 border border-gray-200'} px-4 py-1.5 rounded-full text-sm font-medium shadow-sm`}
            >
              Quick
            </button>
            <button 
              onClick={() => setActiveCategory('Vegetarian')} 
              className={`${activeCategory === 'Vegetarian' ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 border border-gray-200'} px-4 py-1.5 rounded-full text-sm font-medium shadow-sm`}
            >
              Vegetarian
            </button>
            <button 
              onClick={() => setActiveCategory('Budget')} 
              className={`${activeCategory === 'Budget' ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 border border-gray-200'} px-4 py-1.5 rounded-full text-sm font-medium shadow-sm`}
            >
              Budget
            </button>
            <button 
              onClick={() => setActiveCategory('Beginner')} 
              className={`${activeCategory === 'Beginner' ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 border border-gray-200'} px-4 py-1.5 rounded-full text-sm font-medium shadow-sm`}
            >
              Beginner
            </button>
          </div>
        </div>
        
        {/* Recipes grid */}
        <div className="grid grid-cols-1 gap-4">
          {(activeCategory === 'All' 
            ? recipes
            : activeCategory === 'Favorites'
              ? recipes.filter(recipe => recipe.favorite)
              : recipes.filter(recipe => recipe.category && recipe.category.includes(activeCategory))
          ).map((recipe) => (
            <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md hover:translate-y-[-1px] transition-all overflow-hidden cursor-pointer">
                <div className="flex flex-col">
                  {/* Recipe image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div className={`absolute top-0 right-0 m-3 bg-${recipe.color} text-white text-xs font-bold px-2 py-1 rounded-md`}>
                      {recipe.difficulty}
                    </div>
                  </div>
                  
                  {/* Recipe content */}
                  <div className="p-4">
                    <h2 className="font-medium text-lg mb-1">{recipe.title}</h2>
                    <p className="text-sm text-gray-500 mb-3">{recipe.description}</p>
                    
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-gray-400" />
                        <span>Prep: {recipe.prepTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ChefHat size={14} className="text-gray-400" />
                        <span>Cook: {recipe.cookTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} className="text-gray-400" />
                        <span>Serves: {recipe.servings}</span>
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={(e) => toggleFavorite(recipe.id, e)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <Heart 
                          size={18} 
                          className={recipe.favorite ? 'fill-red-500 text-red-500' : 'text-gray-400'} 
                        />
                      </button>
                      <div className={`bg-${recipe.color} h-8 w-8 rounded-md flex items-center justify-center`}>
                        <ChevronRight className="text-white h-5 w-5" />
                      </div>
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
