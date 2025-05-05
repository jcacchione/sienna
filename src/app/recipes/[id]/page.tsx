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
      description: 'Colorful vegetables in a savory sauce over rice',
      prepTime: '15 mins',
      cookTime: '10 mins',
      servings: 2,
      difficulty: 'Easy',
      color: 'orange-500',
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: ['Quick', 'Vegetarian'],
      ingredients: [
        '1 cup rice (any type)',
        '2 tbsp vegetable oil',
        '1 bell pepper, sliced',
        '1 carrot, julienned',
        '1 small broccoli head, cut into florets',
        '1 small onion, sliced',
        '2 cloves garlic, minced',
        '2 tbsp soy sauce',
        '1 tbsp honey or maple syrup',
        '1 tsp sesame oil',
        'Sesame seeds for garnish (optional)'
      ],
      instructions: [
        'Cook rice according to package instructions.',
        'While the rice is cooking, prepare all your vegetables.',
        'Heat vegetable oil in a large wok or frying pan over high heat.',
        'Add onion and garlic, stir-fry for 1 minute until fragrant.',
        'Add carrots and broccoli, stir-fry for 2 minutes.',
        'Add bell pepper and continue to stir-fry for another 2 minutes.',
        'In a small bowl, mix soy sauce, honey/maple syrup, and sesame oil.',
        'Pour the sauce over the vegetables and toss to coat evenly.',
        'Cook for another 1-2 minutes until vegetables are tender but still crisp.',
        'Serve hot over rice, garnished with sesame seeds if desired.'
      ],
      tips: [
        'Feel free to use any vegetables you have on hand - this recipe is very flexible.',
        'For protein, add tofu, tempeh, or a fried egg on top.',
        'The key to good stir-fry is high heat and quick cooking to keep vegetables crisp.'
      ]
    },
    '3': {
      id: '3',
      title: 'Simple Chicken Curry',
      description: 'Tender chicken in a rich, aromatic curry sauce',
      prepTime: '20 mins',
      cookTime: '30 mins',
      servings: 4,
      difficulty: 'Medium',
      color: 'amber-600',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: ['Budget'],
      ingredients: [
        '500g chicken breast or thighs, cut into chunks',
        '1 large onion, finely chopped',
        '2 cloves garlic, minced',
        '1 tbsp fresh ginger, grated',
        '2 tbsp curry powder',
        '1 can (400ml) coconut milk',
        '1 can (400g) diced tomatoes',
        '1 tbsp vegetable oil',
        'Salt and pepper to taste',
        'Fresh coriander for garnish',
        'Rice or naan bread to serve'
      ],
      instructions: [
        'Heat oil in a large pan over medium heat. Add onions and cook until soft and translucent, about 5 minutes.',
        'Add garlic and ginger, cook for another minute until fragrant.',
        'Add curry powder and stir for 30 seconds to toast the spices.',
        'Add chicken pieces and cook until they start to brown, about 5 minutes.',
        'Pour in diced tomatoes and coconut milk, stir well to combine.',
        'Bring to a simmer, then reduce heat to low and cover.',
        'Cook for 20-25 minutes until chicken is cooked through and sauce has thickened.',
        'Season with salt and pepper to taste.',
        'Serve hot over rice or with naan bread, garnished with fresh coriander.'
      ],
      tips: [
        'For a spicier curry, add a chopped chili or some red pepper flakes.',
        'This curry tastes even better the next day as the flavors develop overnight.',
        'You can add vegetables like potatoes, peas, or spinach for a more complete meal.'
      ]
    },
    '4': {
      id: '4',
      title: 'Quick Homemade Fries',
      description: 'Crispy french fries ready in minutes',
      prepTime: '5 mins',
      cookTime: '15 mins',
      servings: 2,
      difficulty: 'Easy',
      color: 'teal-500',
      image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: ['Quick', 'Budget', 'Beginner'],
      ingredients: [
        '2 large potatoes',
        '2 tbsp vegetable oil',
        '1 tsp salt',
        '1/2 tsp paprika (optional)',
        '1/2 tsp garlic powder (optional)',
        'Ketchup or dipping sauce of choice'
      ],
      instructions: [
        'Wash and peel the potatoes (or leave the skin on if preferred).',
        'Cut the potatoes into even strips, about 1/4 inch thick.',
        'Rinse the cut potatoes in cold water to remove excess starch, then pat dry thoroughly.',
        'In a bowl, toss the potato strips with oil, salt, and spices if using.',
        'For oven method: Preheat oven to 425°F (220°C). Arrange fries in a single layer on a baking sheet and bake for 15-20 minutes, flipping halfway.',
        'For air fryer method: Cook at 380°F (195°C) for 12-15 minutes, shaking the basket halfway through.',
        'Once golden and crispy, remove from heat and serve immediately with your favorite dipping sauce.'
      ],
      tips: [
        'Soaking the cut potatoes in cold water for 30 minutes before cooking will make them crispier.',
        'Make sure to dry the potatoes thoroughly after rinsing - moisture will prevent them from crisping.',
        'For extra crispy fries, don\'t overcrowd the baking sheet or air fryer basket.'
      ]
    },
    '5': {
      id: '5',
      title: 'Avocado Toast',
      description: 'Simple, nutritious breakfast or snack',
      prepTime: '5 mins',
      cookTime: '2 mins',
      servings: 1,
      difficulty: 'Easy',
      color: 'green-500',
      image: 'https://images.pexels.com/photos/1824353/pexels-photo-1824353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: ['Quick', 'Vegetarian', 'Beginner'],
      ingredients: [
        '1 slice of bread (sourdough or whole grain works well)',
        '1/2 ripe avocado',
        'Salt and pepper to taste',
        'Optional toppings: red pepper flakes, lemon juice, cherry tomatoes, feta cheese, poached egg'
      ],
      instructions: [
        'Toast the bread to your desired level of crispness.',
        'Cut the avocado in half, remove the pit, and scoop out the flesh into a small bowl.',
        'Mash the avocado with a fork and season with salt and pepper.',
        'Spread the mashed avocado onto the toast.',
        'Add any additional toppings you like.',
        'Enjoy immediately.'
      ],
      tips: [
        'To keep avocado from browning, sprinkle with a little lemon juice.',
        'For extra protein, add a poached or fried egg on top.',
        'Ripe avocados should yield slightly to gentle pressure but not be mushy.'
      ]
    },
    '6': {
      id: '6',
      title: 'One-Pot Lentil Soup',
      description: 'Hearty, nutritious soup that&apos;s budget-friendly',
      prepTime: '10 mins',
      cookTime: '30 mins',
      servings: 4,
      difficulty: 'Easy',
      color: 'orange-500',
      image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: ['Budget', 'Vegetarian'],
      ingredients: [
        '1 cup dried red lentils, rinsed',
        '1 onion, diced',
        '2 carrots, diced',
        '2 celery stalks, diced',
        '2 cloves garlic, minced',
        '1 tsp cumin',
        '1 tsp paprika',
        '4 cups vegetable broth',
        '1 can (400g) diced tomatoes',
        '1 tbsp olive oil',
        'Salt and pepper to taste',
        'Fresh parsley for garnish'
      ],
      instructions: [
        'Heat olive oil in a large pot over medium heat. Add onions, carrots, and celery, cook until softened, about 5 minutes.',
        'Add garlic, cumin, and paprika, cook for another minute until fragrant.',
        'Add lentils, vegetable broth, and diced tomatoes. Stir to combine.',
        'Bring to a boil, then reduce heat to low, cover, and simmer for 25-30 minutes until lentils are tender.',
        'Season with salt and pepper to taste.',
        'Serve hot, garnished with fresh parsley.'
      ],
      tips: [
        'This soup thickens as it cools - add more broth if you prefer a thinner consistency.',
        'For a smoother texture, blend part or all of the soup with an immersion blender.',
        'Leftovers can be refrigerated for up to 4 days or frozen for up to 3 months.'
      ]
    },
    '7': {
      id: '7',
      title: 'Sheet Pan Roasted Vegetables',
      description: 'Easy, versatile side dish or main course',
      prepTime: '15 mins',
      cookTime: '25 mins',
      servings: 4,
      difficulty: 'Easy',
      color: 'green-500',
      image: 'https://images.pexels.com/photos/6316515/pexels-photo-6316515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: ['Budget', 'Vegetarian', 'Beginner'],
      ingredients: [
        '1 bell pepper, chopped',
        '1 zucchini, chopped',
        '1 red onion, chopped',
        '2 cups sweet potato, cubed',
        '2 tbsp olive oil',
        '2 tsp Italian herbs',
        'Salt and pepper to taste',
        'Optional: balsamic vinegar, feta cheese'
      ],
      instructions: [
        'Preheat oven to 200°C (400°F).',
        'Line a large baking sheet with parchment paper.',
        'In a large bowl, toss all vegetables with olive oil, Italian herbs, salt, and pepper.',
        'Spread vegetables in a single layer on the baking sheet.',
        'Roast for 25-30 minutes, stirring halfway through, until vegetables are tender and slightly caramelized.',
        'Serve hot as a side dish or over rice or quinoa as a main course.'
      ],
      tips: [
        'Cut vegetables into similar-sized pieces so they cook evenly.',
        'Don\'t overcrowd the pan - use two sheets if necessary.',
        'Add a drizzle of balsamic vinegar and sprinkle of feta cheese before serving for extra flavor.'
      ]
    },
    '8': {
      id: '8',
      title: 'Overnight Oats',
      description: 'No-cook breakfast prepared the night before',
      prepTime: '5 mins',
      cookTime: '0 mins',
      servings: 1,
      difficulty: 'Easy',
      color: 'amber-600',
      image: 'https://images.pexels.com/photos/4916057/pexels-photo-4916057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: ['Quick', 'Vegetarian', 'Beginner'],
      ingredients: [
        '1/2 cup rolled oats',
        '1/2 cup milk of choice',
        '1/4 cup yogurt (optional)',
        '1 tbsp chia seeds (optional)',
        '1 tbsp honey or maple syrup',
        'Toppings: fresh fruit, nuts, cinnamon'
      ],
      instructions: [
        'In a jar or container, combine oats, milk, yogurt (if using), chia seeds (if using), and sweetener.',
        'Stir well to combine.',
        'Cover and refrigerate overnight or for at least 4 hours.',
        'In the morning, add your favorite toppings and enjoy cold or warm it up if preferred.'
      ],
      tips: [
        'Make several jars at once for breakfast throughout the week.',
        'Experiment with flavors - try adding cocoa powder, vanilla extract, or peanut butter.',
        'For a thicker consistency, add more chia seeds or use Greek yogurt.'
      ]
    }
  };
  
  const recipe = recipes[id];
  
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
          
          {/* Tips */}
          {recipe.tips && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Tips</h2>
              <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
                <ul className="space-y-2">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
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
