"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import { Clock, ChefHat, Users, Heart, Bookmark, Share2, CheckCircle, ArrowLeft } from 'lucide-react';
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
  image: string;
  category: string[];
  ingredients: string[];
  instructions: string[];
  tips?: string[];
};

export default function RecipeDetail() {
  const params = useParams();
  const id = params.id as string;
  
  // Check if recipe is favorited in localStorage
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  
  useEffect(() => {
    // Check if this recipe is favorited
    const storedFavorites = localStorage.getItem('favoriteRecipes');
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      setLiked(favorites.includes(id));
    }
  }, [id]);
  
  // Toggle favorite status
  const toggleFavorite = () => {
    const newLikedStatus = !liked;
    setLiked(newLikedStatus);
    
    // Update localStorage
    const storedFavorites = localStorage.getItem('favoriteRecipes');
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    
    if (newLikedStatus) {
      // Add to favorites if not already there
      if (!favorites.includes(id)) {
        favorites.push(id);
      }
    } else {
      // Remove from favorites
      favorites = favorites.filter((favId: string) => favId !== id);
    }
    
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  };
  
  // Sample recipes data - in a real app, this would be fetched from an API
  const recipes: Record<string, Recipe> = {
    '1': {
      id: '1',
      title: 'Creamy Bacon Tagliatelle',
      description: 'Rich pasta with bacon in a creamy sauce',
      prepTime: '10 mins',
      cookTime: '15 mins',
      servings: 2,
      difficulty: 'Easy',
      color: 'teal-500',
      image: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: ['Quick', 'Budget'],
      ingredients: [
        '250g tagliatelle pasta',
        '150g bacon, chopped',
        '1 small onion, finely diced',
        '2 cloves garlic, minced',
        '200ml heavy cream',
        '2 tbsp butter',
        '50g Parmesan cheese, grated',
        'Salt and black pepper to taste',
        'Fresh parsley for garnish'
      ],
      instructions: [
        'Bring a large pot of salted water to a boil. Add the tagliatelle and cook according to package instructions until al dente.',
        'While the pasta is cooking, heat a large pan over medium heat. Add the chopped bacon and cook until it begins to crisp, about 5 minutes.',
        'Add the diced onion to the pan and cook until softened, about 3 minutes. Add the garlic and cook for another minute.',
        'Pour in the heavy cream and bring to a simmer. Let it reduce slightly for about 2 minutes.',
        'Stir in the butter until melted, then add half of the Parmesan cheese.',
        'Once the pasta is cooked, drain it, reserving a small cup of pasta water.',
        'Add the drained pasta to the sauce and toss to coat. If the sauce is too thick, add a splash of the reserved pasta water.',
        'Season with salt and pepper to taste. Serve immediately topped with the remaining Parmesan and fresh parsley.'
      ],
      tips: [
        'For extra flavor, add a splash of white wine after cooking the onions and let it reduce before adding the cream.',
        'You can add peas or mushrooms to the sauce for extra vegetables.',
        'The sauce will thicken as it cools, so serve immediately for the best consistency.'
      ]
    },
    '2': {
      id: '2',
      title: 'Quick Vegetable Stir Fry',
      description: 'A healthy and colorful vegetable stir fry',
      prepTime: '15 mins',
      cookTime: '10 mins',
      servings: 2,
      difficulty: 'Easy',
      color: 'green-500',
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: ['Vegetarian', 'Quick', 'Healthy'],
      ingredients: [
        '1 red bell pepper, sliced',
        '1 yellow bell pepper, sliced',
        '1 carrot, julienned',
        '1 small broccoli head, cut into florets',
        '1 cup snap peas',
        '2 cloves garlic, minced',
        '1 thumb-sized piece ginger, grated',
        '2 tbsp soy sauce',
        '1 tbsp honey or maple syrup',
        '1 tbsp sesame oil',
        '2 tbsp vegetable oil',
        'Sesame seeds for garnish',
        'Spring onions, sliced, for garnish'
      ],
      instructions: [
        'Prepare all your vegetables and have them ready before you start cooking.',
        'In a small bowl, mix together the soy sauce, honey, and sesame oil to make the sauce.',
        'Heat the vegetable oil in a large wok or frying pan over high heat.',
        'Add the garlic and ginger and stir-fry for 30 seconds until fragrant.',
        'Add the harder vegetables first (carrots and broccoli) and stir-fry for 2 minutes.',
        'Add the bell peppers and snap peas and continue to stir-fry for another 3-4 minutes until vegetables are crisp-tender.',
        'Pour in the sauce and toss everything together for 1 minute until well coated and heated through.',
        'Serve immediately, garnished with sesame seeds and sliced spring onions.'
      ],
      tips: [
        'For a protein boost, add tofu, chicken, or shrimp to the stir fry.',
        'Keep the vegetables moving in the pan to ensure even cooking and to prevent burning.',
        'You can substitute any vegetables you have on hand - this recipe is very flexible.'
      ]
    },
    '3': {
      id: '3',
      title: 'Simple Greek Salad',
      description: 'A refreshing Mediterranean salad',
      prepTime: '15 mins',
      cookTime: '0 mins',
      servings: 4,
      difficulty: 'Easy',
      color: 'blue-500',
      image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: ['Vegetarian', 'Quick', 'No Cook'],
      ingredients: [
        '1 cucumber, diced',
        '4 large tomatoes, cut into chunks',
        '1 red onion, thinly sliced',
        '1 green bell pepper, diced',
        '200g feta cheese, cubed',
        '100g kalamata olives',
        '2 tbsp extra virgin olive oil',
        '1 tbsp red wine vinegar',
        '1 tsp dried oregano',
        'Salt and black pepper to taste'
      ],
      instructions: [
        'In a large bowl, combine the cucumber, tomatoes, red onion, and green bell pepper.',
        'Add the feta cheese and olives to the bowl.',
        'In a small bowl, whisk together the olive oil, red wine vinegar, dried oregano, salt, and pepper to make the dressing.',
        'Pour the dressing over the salad and gently toss to combine.',
        'Let the salad sit for about 10 minutes before serving to allow the flavors to meld together.'
      ],
      tips: [
        'For the best flavor, use ripe, in-season tomatoes.',
        'You can add a squeeze of lemon juice for extra freshness.',
        'This salad is best served at room temperature rather than cold from the refrigerator.'
      ]
    }
  };
  
  const recipe = recipes[id];
  
  // If recipe doesn't exist, show a not found message
  if (!recipe) {
    return (
      <main className="flex flex-col min-h-screen pb-16 bg-gray-50">
        <Header title="Recipe Not Found" />
        <div className="flex-1 px-4 pt-4 pb-6 flex flex-col items-center justify-center">
          <ChefHat className="h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Recipe Not Found</h2>
          <p className="text-gray-500 mb-6 text-center">The recipe you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/recipes" className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-2">
            <ArrowLeft size={18} />
            Back to Recipes
          </Link>
        </div>
        <Navbar />
      </main>
    );
  }
  
  return (
    <main className="flex flex-col min-h-screen pb-16 bg-gray-50">
      <Header title="Recipe Details" />
      
      <div className="flex-1">
        {/* Recipe image */}
        <div className="relative h-64 w-full">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h1 className="text-2xl font-bold mb-1">{recipe.title}</h1>
            <p className="text-sm opacity-90">{recipe.description}</p>
          </div>
        </div>
        
        {/* Recipe info */}
        <div className="px-4 py-4 bg-white border-b border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <div className={`px-3 py-1 bg-${recipe.color} text-white text-sm font-medium rounded-full`}>
              {recipe.difficulty}
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setSaved(!saved)}
                className={`p-2 rounded-full ${saved ? 'bg-teal-100 text-teal-500' : 'bg-gray-100 text-gray-500'}`}
              >
                <Bookmark size={18} />
              </button>
              <button 
                onClick={toggleFavorite}
                className={`p-2 rounded-full ${liked ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500'}`}
              >
                <Heart size={18} className={liked ? 'fill-current' : ''} />
              </button>
              <button className="p-2 rounded-full bg-gray-100 text-gray-500">
                <Share2 size={18} />
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock size={16} className="text-gray-400" />
              <span>Prep: {recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <ChefHat size={16} className="text-gray-400" />
              <span>Cook: {recipe.cookTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} className="text-gray-400" />
              <span>Serves: {recipe.servings}</span>
            </div>
          </div>
        </div>
        
        {/* Recipe content */}
        <div className="px-4 pt-4 pb-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {recipe.category.map((cat, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {cat}
              </span>
            ))}
          </div>
          
          {/* Ingredients */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Ingredients</h2>
            <ul className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="p-3 border-b border-gray-100 last:border-b-0 flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-teal-500"></div>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Instructions */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Instructions</h2>
            <ol className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="p-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span>{instruction}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          
          {/* Tips - Updated for dark mode compatibility */}
          {recipe.tips && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Tips</h2>
              <div className="bg-base-200 rounded-lg p-4 border border-base-300">
                <ul className="space-y-2">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle size={18} className={`text-${recipe.color} flex-shrink-0 mt-0.5`} />
                      <span className="text-base-content">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Navbar />
    </main>
  );
}