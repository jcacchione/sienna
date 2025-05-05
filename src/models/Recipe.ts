export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit?: string;
}

export interface Step {
  id: string;
  order: number;
  description: string;
  imageUrl?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: Ingredient[];
  steps: Step[];
  imageUrl?: string;
  videoUrl?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
