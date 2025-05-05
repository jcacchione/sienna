export interface ListItem {
  id: string;
  name: string;
  completed: boolean;
  recommendedBrand?: string;
  recommendedPrice?: number;
  imageUrl?: string;
  notes?: string;
}

export interface List {
  id: string;
  title: string;
  description?: string;
  items: ListItem[];
  createdAt: Date;
  updatedAt: Date;
  icon?: string;
}
