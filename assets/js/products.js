/**
 * GreenHarvest - Products Database & Utility Methods
 * High Quality Organic Produce & Foods Catalog
 */

const PRODUCTS_DATA = [
  // 1. FRESH FRUITS
  {
    id: "fruit-1",
    name: "Honeycrisp Organic Apples",
    category: "Fresh Fruits",
    price: 4.49,
    originalPrice: 5.49,
    discount: "18% OFF",
    rating: 4.9,
    reviewsCount: 142,
    badge: "Bestseller",
    isBestseller: true,
    isFreshPick: true,
    isSpecialOffer: false,
    inStock: true,
    stockCount: 85,
    unit: "500g",
    weightOptions: [
      { label: "250g", price: 2.49 },
      { label: "500g", price: 4.49 },
      { label: "1kg", price: 8.29 }
    ],
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579613832125-5d34a13ffe0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Crisp, sweet, and naturally juicy Honeycrisp apples cultivated without synthetic pesticides or chemical waxes. Grown in rich biodynamic orchards and hand-picked at peak sun ripeness.",
    farmOrigin: "Highland Orchard Haven, Washington",
    harvestDate: "Harvested 24 hours ago",
    certification: "USDA Organic, Non-GMO Verified",
    storage: "Refrigerate upon arrival to preserve natural crispness for up to 3 weeks.",
    nutrition: { calories: "52 kcal", carbs: "14g", protein: "0.3g", fat: "0.2g", fiber: "2.4g" }
  },
  {
    id: "fruit-2",
    name: "Golden Cavendish Organic Bananas",
    category: "Fresh Fruits",
    price: 2.19,
    originalPrice: 2.79,
    discount: "21% OFF",
    rating: 4.8,
    reviewsCount: 96,
    badge: "Farm Direct",
    isBestseller: true,
    isFreshPick: false,
    isSpecialOffer: true,
    inStock: true,
    stockCount: 120,
    unit: "500g",
    weightOptions: [
      { label: "500g", price: 2.19 },
      { label: "1kg", price: 3.99 },
      { label: "2kg", price: 7.49 }
    ],
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Naturally tree-ripened organic bananas packed with natural potassium, dietary fiber, and instant clean energy. Free from artificial ripening agents or carbide gases.",
    farmOrigin: "Coastal Tropics Organic Farm",
    harvestDate: "Hand-picked yesterday morning",
    certification: "Fair Trade & USDA Organic Certified",
    storage: "Keep at room temperature away from direct sunlight.",
    nutrition: { calories: "89 kcal", carbs: "23g", protein: "1.1g", fat: "0.3g", fiber: "2.6g" }
  },
  {
    id: "fruit-3",
    name: "Valencia Sun-Kissed Oranges",
    category: "Fresh Fruits",
    price: 3.89,
    originalPrice: 4.50,
    discount: "14% OFF",
    rating: 4.9,
    reviewsCount: 88,
    badge: "Seasonal Pick",
    isBestseller: false,
    isFreshPick: true,
    isSpecialOffer: false,
    inStock: true,
    stockCount: 65,
    unit: "500g",
    weightOptions: [
      { label: "500g", price: 3.89 },
      { label: "1kg", price: 6.99 },
      { label: "2kg", price: 12.99 }
    ],
    image: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Sun-drenched, plump organic oranges bursting with vibrant Vitamin C and natural citrus aroma. Perfect for breakfast juicing or refreshing afternoon slices.",
    farmOrigin: "Sunny Ridge Groves, California",
    harvestDate: "Fresh morning harvest",
    certification: "100% Certified Organic",
    storage: "Store at cool room temperature or chill in crisper drawer for up to 2 weeks.",
    nutrition: { calories: "47 kcal", carbs: "12g", protein: "0.9g", fat: "0.1g", fiber: "2.4g" }
  },
  {
    id: "fruit-4",
    name: "Alphonso Organic King Mangoes",
    category: "Fresh Fruits",
    price: 7.99,
    originalPrice: 9.99,
    discount: "20% OFF",
    rating: 5.0,
    reviewsCount: 210,
    badge: "Premium Harvest",
    isBestseller: true,
    isFreshPick: true,
    isSpecialOffer: true,
    inStock: true,
    stockCount: 40,
    unit: "500g",
    weightOptions: [
      { label: "500g", price: 7.99 },
      { label: "1kg", price: 14.99 }
    ],
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Renowned as the king of mangoes. Unmatched rich saffron aroma, buttery velvety flesh, and decadent sweetness without fiber strings.",
    farmOrigin: "Ratnagiri Heritage Coastal Groves",
    harvestDate: "Air-flown farm harvest",
    certification: "GI Tagged & Organic Certified",
    storage: "Ripen wrapped in brown paper at room temp, then chill before serving.",
    nutrition: { calories: "60 kcal", carbs: "15g", protein: "0.8g", fat: "0.4g", fiber: "1.6g" }
  },

  // 2. FRESH VEGETABLES
  {
    id: "veg-1",
    name: "Farm-Fresh Sweet Carrots",
    category: "Vegetables",
    price: 2.89,
    originalPrice: 3.50,
    discount: "17% OFF",
    rating: 4.8,
    reviewsCount: 115,
    badge: "Fresh Pick",
    isBestseller: true,
    isFreshPick: true,
    isSpecialOffer: false,
    inStock: true,
    stockCount: 95,
    unit: "500g",
    weightOptions: [
      { label: "250g", price: 1.69 },
      { label: "500g", price: 2.89 },
      { label: "1kg", price: 5.29 }
    ],
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Tender, crunchy root carrots with leafy green tops still attached. Rich in natural beta-carotene and sweetness, harvested from organic mineral-rich soil.",
    farmOrigin: "Green Soil Valley Farms",
    harvestDate: "Pulled from ground this morning",
    certification: "Certified Organic & Regenerative Soil Verified",
    storage: "Cut green tops and keep carrots unpeeled in refrigerator crisper.",
    nutrition: { calories: "41 kcal", carbs: "10g", protein: "0.9g", fat: "0.2g", fiber: "2.8g" }
  },
  {
    id: "veg-2",
    name: "Vine-Ripened Heirloom Tomatoes",
    category: "Vegetables",
    price: 3.29,
    originalPrice: 3.99,
    discount: "18% OFF",
    rating: 4.9,
    reviewsCount: 167,
    badge: "Bestseller",
    isBestseller: true,
    isFreshPick: true,
    isSpecialOffer: false,
    inStock: true,
    stockCount: 70,
    unit: "500g",
    weightOptions: [
      { label: "250g", price: 1.89 },
      { label: "500g", price: 3.29 },
      { label: "1kg", price: 5.99 }
    ],
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546470427-e26264be0b11?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Deep ruby red, naturally fragrant vine tomatoes with authentic heirloom flavor. Bursting with savory lycopene and balanced sweetness for fresh salads and sauces.",
    farmOrigin: "Meadowbrook Organic Farmsteads",
    harvestDate: "Hand-picked yesterday afternoon",
    certification: "100% Pesticide-Free & Organic",
    storage: "Never refrigerate! Store stem-side down at room temperature.",
    nutrition: { calories: "18 kcal", carbs: "3.9g", protein: "0.9g", fat: "0.2g", fiber: "1.2g" }
  },
  {
    id: "veg-3",
    name: "Tender Baby Spinach Leaves",
    category: "Vegetables",
    price: 2.49,
    originalPrice: 2.99,
    discount: "16% OFF",
    rating: 4.7,
    reviewsCount: 92,
    badge: "Fresh Pick",
    isBestseller: false,
    isFreshPick: true,
    isSpecialOffer: false,
    inStock: true,
    stockCount: 50,
    unit: "250g",
    weightOptions: [
      { label: "250g", price: 2.49 },
      { label: "500g", price: 4.49 }
    ],
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Triple-washed and air-dried tender young organic spinach leaves. Delicate, iron-rich, and ready to toss into wholesome smoothies, salads, or sautéed bowls.",
    farmOrigin: "Spring Green Hydro-Bio Farm",
    harvestDate: "Harvested early today",
    certification: "USDA Organic Certified",
    storage: "Refrigerate in breathable organic cotton bag or sealed container.",
    nutrition: { calories: "23 kcal", carbs: "3.6g", protein: "2.9g", fat: "0.4g", fiber: "2.2g" }
  },
  {
    id: "veg-4",
    name: "Artisanal Yukon Gold Potatoes",
    category: "Vegetables",
    price: 3.19,
    originalPrice: 3.89,
    discount: "18% OFF",
    rating: 4.8,
    reviewsCount: 78,
    badge: "Pantry Staple",
    isBestseller: false,
    isFreshPick: false,
    isSpecialOffer: true,
    inStock: true,
    stockCount: 110,
    unit: "1kg",
    weightOptions: [
      { label: "1kg", price: 3.19 },
      { label: "2kg", price: 5.99 },
      { label: "5kg", price: 13.99 }
    ],
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Naturally buttery, thin-skinned organic Yukon Gold potatoes. Ideal for velvety roasts, creamy mash, and boiling without crumbling.",
    farmOrigin: "Highland Valley Organics",
    harvestDate: "Cured & harvested this week",
    certification: "Non-GMO & Organic Certified",
    storage: "Store in a dark, dry, and well-ventilated basket.",
    nutrition: { calories: "77 kcal", carbs: "17g", protein: "2.1g", fat: "0.1g", fiber: "2.2g" }
  },

  // 3. GRAINS & PULSES
  {
    id: "grain-1",
    name: "Royal Himalayan Aged Basmati Rice",
    category: "Grains & Pulses",
    price: 6.99,
    originalPrice: 8.50,
    discount: "18% OFF",
    rating: 4.9,
    reviewsCount: 189,
    badge: "Bestseller",
    isBestseller: true,
    isFreshPick: false,
    isSpecialOffer: false,
    inStock: true,
    stockCount: 75,
    unit: "1kg",
    weightOptions: [
      { label: "500g", price: 3.89 },
      { label: "1kg", price: 6.99 },
      { label: "5kg", price: 31.99 }
    ],
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Two-year aged organic long-grain Basmati rice nourished by pure Himalayan glacier water. Bakes into aromatic, non-sticky, exceptionally fluffy slender grains.",
    farmOrigin: "Himalayan Foothills Organic Cooperative",
    harvestDate: "Naturally aged 24 months",
    certification: "100% Organic & Non-GMO Verified",
    storage: "Store in an airtight container in a dry pantry.",
    nutrition: { calories: "130 kcal", carbs: "28g", protein: "2.7g", fat: "0.3g", fiber: "0.4g" }
  },
  {
    id: "grain-2",
    name: "Ancient Royal White Quinoa",
    category: "Grains & Pulses",
    price: 5.49,
    originalPrice: 6.99,
    discount: "21% OFF",
    rating: 4.9,
    reviewsCount: 112,
    badge: "Superfood",
    isBestseller: true,
    isFreshPick: false,
    isSpecialOffer: true,
    inStock: true,
    stockCount: 60,
    unit: "500g",
    weightOptions: [
      { label: "250g", price: 2.99 },
      { label: "500g", price: 5.49 },
      { label: "1kg", price: 9.99 }
    ],
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Saponin-washed, high-protein ancient seed grain from high-altitude organic farms. Provides all 9 essential amino acids with a nutty texture.",
    farmOrigin: "Andean Organic Farmers Alliance",
    harvestDate: "Season harvest",
    certification: "Fair Trade & USDA Organic Certified",
    storage: "Airtight pantry container.",
    nutrition: { calories: "120 kcal", carbs: "21g", protein: "4.4g", fat: "1.9g", fiber: "2.8g" }
  },
  {
    id: "grain-3",
    name: "Organic Red Lentils (Masoor Dal)",
    category: "Grains & Pulses",
    price: 3.49,
    originalPrice: 4.20,
    discount: "17% OFF",
    rating: 4.8,
    reviewsCount: 84,
    badge: "Protein Rich",
    isBestseller: false,
    isFreshPick: false,
    isSpecialOffer: false,
    inStock: true,
    stockCount: 88,
    unit: "500g",
    weightOptions: [
      { label: "500g", price: 3.49 },
      { label: "1kg", price: 6.29 }
    ],
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Unpolished split red lentils, free from synthetic dyes or mineral oil polishing. Melts quickly into velvety comforting curries and hearty soups.",
    farmOrigin: "Central Plains Organic Cooperative",
    harvestDate: "Fresh milling batch",
    certification: "Certified Organic & Unpolished",
    storage: "Keep dry in glass container.",
    nutrition: { calories: "116 kcal", carbs: "20g", protein: "9g", fat: "0.4g", fiber: "7.9g" }
  },

  // 4. NATURAL OILS
  {
    id: "oil-1",
    name: "Cold-Pressed Extra Virgin Coconut Oil",
    category: "Natural Oils",
    price: 9.99,
    originalPrice: 12.50,
    discount: "20% OFF",
    rating: 4.9,
    reviewsCount: 230,
    badge: "Bestseller",
    isBestseller: true,
    isFreshPick: false,
    isSpecialOffer: true,
    inStock: true,
    stockCount: 65,
    unit: "500ml",
    weightOptions: [
      { label: "250ml", price: 5.49 },
      { label: "500ml", price: 9.99 },
      { label: "1L", price: 18.49 }
    ],
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Centrifuge-extracted cold pressed oil from fresh organic coconut milk. Raw, unrefined, retaining delicate tropical aroma and nourishing medium chain triglycerides (MCTs).",
    farmOrigin: "Kerala Organic Coconut Estates",
    harvestDate: "Cold expeller pressed this month",
    certification: "100% Raw Virgin Organic",
    storage: "Solidifies below 24°C naturally without affecting quality.",
    nutrition: { calories: "120 kcal per tbsp", carbs: "0g", protein: "0g", fat: "14g", fiber: "0g" }
  },
  {
    id: "oil-2",
    name: "Traditional Wood-Pressed Groundnut Oil",
    category: "Natural Oils",
    price: 8.49,
    originalPrice: 10.00,
    discount: "15% OFF",
    rating: 4.8,
    reviewsCount: 94,
    badge: "Wood Pressed",
    isBestseller: false,
    isFreshPick: false,
    isSpecialOffer: false,
    inStock: true,
    stockCount: 45,
    unit: "1L",
    weightOptions: [
      { label: "500ml", price: 4.79 },
      { label: "1L", price: 8.49 },
      { label: "2L", price: 15.99 }
    ],
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Extracted in slow wooden churners (Ghani) at room temperature. Preserves the authentic nutty flavor, high smoke point, and natural antioxidants.",
    farmOrigin: "Saurashtra Organic Peasant Network",
    harvestDate: "Freshly pressed small batches",
    certification: "Traditional Ghani Verified & Organic",
    storage: "Keep in a dark tinted glass or tin container.",
    nutrition: { calories: "119 kcal per tbsp", carbs: "0g", protein: "0g", fat: "13.5g", fiber: "0g" }
  },
  {
    id: "oil-3",
    name: "Pure First Cold-Pressed Sesame Oil",
    category: "Natural Oils",
    price: 7.99,
    originalPrice: 9.50,
    discount: "16% OFF",
    rating: 4.9,
    reviewsCount: 72,
    badge: "Ayurvedic Grade",
    isBestseller: false,
    isFreshPick: false,
    isSpecialOffer: false,
    inStock: true,
    stockCount: 38,
    unit: "500ml",
    weightOptions: [
      { label: "500ml", price: 7.99 },
      { label: "1L", price: 14.99 }
    ],
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Rich golden sesame oil pressed with unrefined palm jaggery in the authentic traditional method. Revered for deep savory aroma and therapeutic qualities.",
    farmOrigin: "Tamil Nadu Heritage Seed Farmers",
    harvestDate: "Pressed 10 days ago",
    certification: "Certified Organic & Cold Processed",
    storage: "Store away from heat and strong spices.",
    nutrition: { calories: "120 kcal per tbsp", carbs: "0g", protein: "0g", fat: "14g", fiber: "0g" }
  },

  // 5. HEALTHY SNACKS
  {
    id: "snack-1",
    name: "Raw Organic California Almonds",
    category: "Healthy Snacks",
    price: 8.99,
    originalPrice: 11.20,
    discount: "20% OFF",
    rating: 4.9,
    reviewsCount: 175,
    badge: "Bestseller",
    isBestseller: true,
    isFreshPick: false,
    isSpecialOffer: true,
    inStock: true,
    stockCount: 110,
    unit: "500g",
    weightOptions: [
      { label: "250g", price: 4.99 },
      { label: "500g", price: 8.99 },
      { label: "1kg", price: 16.99 }
    ],
    image: "https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508061252445-5350f3ab0a55?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Whole, unpasteurized natural almonds. Crunchy, naturally sweet, packed with Vitamin E, plant protein, and healthy monounsaturated fats.",
    farmOrigin: "Sun Valley Organic Orchards",
    harvestDate: "Current season crop",
    certification: "USDA Organic & Non-Pasteurized",
    storage: "Refrigerate or store in sealed jar for prolonged freshness.",
    nutrition: { calories: "164 kcal per oz", carbs: "6g", protein: "6g", fat: "14g", fiber: "3.5g" }
  },
  {
    id: "snack-2",
    name: "Medjool Royal Natural Dates",
    category: "Healthy Snacks",
    price: 6.49,
    originalPrice: 7.99,
    discount: "19% OFF",
    rating: 5.0,
    reviewsCount: 130,
    badge: "Sweet Natural",
    isBestseller: true,
    isFreshPick: false,
    isSpecialOffer: false,
    inStock: true,
    stockCount: 55,
    unit: "500g",
    weightOptions: [
      { label: "250g", price: 3.59 },
      { label: "500g", price: 6.49 },
      { label: "1kg", price: 11.99 }
    ],
    image: "https://images.unsplash.com/photo-1587888637140-849b25d80ef9?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587888637140-849b25d80ef9?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Soft, plump, caramel-sweet organic Medjool dates with zero added sugar or preservatives. Nature's sweetest natural candy and pre-workout fuel.",
    farmOrigin: "Oasis Organic Palm Grove",
    harvestDate: "Hand selected batch",
    certification: "100% Certified Organic & Raw",
    storage: "Keep refrigerated for a chewy candy-like texture.",
    nutrition: { calories: "66 kcal per date", carbs: "18g", protein: "0.4g", fat: "0g", fiber: "1.6g" }
  },
  {
    id: "snack-3",
    name: "Organic Raw Walnut Halves",
    category: "Healthy Snacks",
    price: 9.49,
    originalPrice: 11.99,
    discount: "21% OFF",
    rating: 4.8,
    reviewsCount: 82,
    badge: "Brain Food",
    isBestseller: false,
    isFreshPick: false,
    isSpecialOffer: false,
    inStock: true,
    stockCount: 48,
    unit: "500g",
    weightOptions: [
      { label: "250g", price: 5.29 },
      { label: "500g", price: 9.49 },
      { label: "1kg", price: 17.99 }
    ],
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Jumbo light-colored organic walnut halves rich in heart-healthy Omega-3 ALA fatty acids. Freshly shelled without bitter aftertaste.",
    farmOrigin: "Kashmir Organic Mountain Orchards",
    harvestDate: "Vacuum packed farm-fresh",
    certification: "Non-GMO & Certified Organic",
    storage: "Refrigerate in airtight glass jar to protect delicate Omega oils.",
    nutrition: { calories: "185 kcal per oz", carbs: "4g", protein: "4.3g", fat: "18.5g", fiber: "1.9g" }
  },

  // 6. NATURAL FOODS
  {
    id: "food-1",
    name: "Raw Wildflower Forest Honey",
    category: "Natural Foods",
    price: 8.99,
    originalPrice: 10.99,
    discount: "18% OFF",
    rating: 5.0,
    reviewsCount: 265,
    badge: "Bestseller",
    isBestseller: true,
    isFreshPick: false,
    isSpecialOffer: true,
    inStock: true,
    stockCount: 70,
    unit: "500g",
    weightOptions: [
      { label: "250g", price: 4.99 },
      { label: "500g", price: 8.99 },
      { label: "1kg", price: 16.50 }
    ],
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Unfiltered, unheated, antibiotic-free raw honey collected by ethical beekeepers from deep forest flora. Rich in natural bee pollen, enzymes, and medicinal floral nectar.",
    farmOrigin: "Wild Forest Sanctuaries, Western Ghats",
    harvestDate: "Seasonal blossom extraction",
    certification: "Raw Organic Certified & Lab Tested Purity",
    storage: "Store at room temp. Natural crystallization is a sign of raw purity.",
    nutrition: { calories: "64 kcal per tbsp", carbs: "17g", protein: "0.1g", fat: "0g", fiber: "0g" }
  },
  {
    id: "food-2",
    name: "Artisanal Organic Cane Jaggery Block",
    category: "Natural Foods",
    price: 3.49,
    originalPrice: 4.19,
    discount: "16% OFF",
    rating: 4.8,
    reviewsCount: 64,
    badge: "Unrefined",
    isBestseller: false,
    isFreshPick: false,
    isSpecialOffer: false,
    inStock: true,
    stockCount: 65,
    unit: "500g",
    weightOptions: [
      { label: "500g", price: 3.49 },
      { label: "1kg", price: 6.29 }
    ],
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Naturally clarified sugarcane jaggery prepared with plant-based okra extract instead of chemical bleaches. Deep golden-brown color with essential iron and minerals.",
    farmOrigin: "Kolhapur Organic Cane Valley",
    harvestDate: "Handmade artisanal batch",
    certification: "Chemical-Free & Organic Certified",
    storage: "Airtight container away from moisture.",
    nutrition: { calories: "383 kcal per 100g", carbs: "98g", protein: "0.4g", fat: "0.1g", fiber: "0g" }
  },
  {
    id: "food-3",
    name: "Pure High-Curcumin Lakadong Turmeric",
    category: "Natural Foods",
    price: 4.99,
    originalPrice: 6.00,
    discount: "17% OFF",
    rating: 4.9,
    reviewsCount: 140,
    badge: "Super Spice",
    isBestseller: true,
    isFreshPick: false,
    isSpecialOffer: false,
    inStock: true,
    stockCount: 80,
    unit: "250g",
    weightOptions: [
      { label: "250g", price: 4.99 },
      { label: "500g", price: 8.99 }
    ],
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Sourced from the pristine hills of Meghalaya. Tested with extraordinary 7-9% natural curcumin content, far exceeding ordinary commercial turmeric.",
    farmOrigin: "Jaintia Hills Organic Tribes",
    harvestDate: "Sun-dried and stone ground",
    certification: "Single Origin & Certified Organic",
    storage: "Cool dry dark pantry to protect bright curcumin pigments.",
    nutrition: { calories: "29 kcal per tbsp", carbs: "6.3g", protein: "0.9g", fat: "0.3g", fiber: "2.1g" }
  }
];

// Initialize in localStorage if not exists so admin edits persist!
function getStoredProducts() {
  const local = localStorage.getItem("greenharvest_products");
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      console.error("Error reading stored products", e);
    }
  }
  localStorage.setItem("greenharvest_products", JSON.stringify(PRODUCTS_DATA));
  return PRODUCTS_DATA;
}

function saveProducts(productsList) {
  localStorage.setItem("greenharvest_products", JSON.stringify(productsList));
}

// Helper methods
function getProductById(id) {
  const products = getStoredProducts();
  return products.find(p => p.id === id) || products[0];
}

function getProductsByCategory(category) {
  const products = getStoredProducts();
  if (!category || category === "All") return products;
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

function getBestsellers(limit = 4) {
  const products = getStoredProducts();
  return products.filter(p => p.isBestseller).slice(0, limit);
}

function getFreshPicks(limit = 4) {
  const products = getStoredProducts();
  return products.filter(p => p.isFreshPick).slice(0, limit);
}

function getSpecialOffers(limit = 4) {
  const products = getStoredProducts();
  return products.filter(p => p.isSpecialOffer).slice(0, limit);
}

function getRelatedProducts(currentId, category, limit = 4) {
  const products = getStoredProducts();
  return products
    .filter(p => p.id !== currentId && p.category === category)
    .slice(0, limit);
}

/**
 * Render reusable standard Product Card HTML
 * Consistent with UI rules:
 * - Brand Forest Green (#315C3B) & Harvest Gold (#D6A85F)
 * - Wishlist icon toggle
 * - Farm origin pill
 * - In-card weight selector (250g, 500g, 1kg) with live price updates
 * - Add to Cart button
 */
function createProductCardHTML(p) {
  const wishlist = JSON.parse(localStorage.getItem("greenharvest_wishlist") || "[]");
  const isFav = wishlist.includes(p.id);

  // Generate weight selector pills if multiple weights available
  let weightPillsHTML = "";
  if (p.weightOptions && p.weightOptions.length > 1) {
    weightPillsHTML = `
      <div class="flex items-center gap-1.5 my-2 flex-wrap">
        ${p.weightOptions.map((opt, idx) => `
          <button 
            type="button" 
            data-weight="${opt.label}"
            onclick="selectCardWeight('${p.id}', '${opt.label}', ${opt.price}, event)"
            class="weight-pill text-[11px] px-2 py-0.5 rounded-md transition-all ${idx === 1 || (idx === 0 && p.weightOptions.length === 1) ? 'bg-[#315C3B] text-white dark:bg-[#D6A85F] dark:text-[#121614] font-semibold' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}"
          >
            ${opt.label}
          </button>
        `).join("")}
      </div>
    `;
  }

  return `
    <div class="card-clean group flex flex-col justify-between overflow-hidden relative" data-product-id="${p.id}">
      <!-- Badges & Wishlist -->
      <div class="absolute top-3 left-3 z-10 flex flex-col gap-1">
        ${p.badge ? `<span class="badge-gold text-xs shadow-sm">${p.badge}</span>` : ""}
        ${p.discount ? `<span class="badge-green text-xs font-semibold shadow-sm">${p.discount}</span>` : ""}
      </div>
      <button 
        type="button"
        onclick="toggleWishlist('${p.id}', event)" 
        aria-label="Save to Wishlist" 
        class="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-sm flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors ${isFav ? 'text-red-500 fill-current' : ''}"
        data-wishlist-btn="${p.id}"
      >
        <svg class="w-5 h-5 ${isFav ? 'fill-red-500 text-red-500' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </button>

      <!-- Image Area -->
      <a href="product-details.html?id=${p.id}" class="aspect-product block overflow-hidden bg-[#F4EFEA] dark:bg-gray-800">
        <img src="${p.image}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
      </a>

      <!-- Product Info -->
      <div class="p-4 sm:p-5 flex flex-col flex-grow">
        <!-- Farm Origin & Category -->
        <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
          <span class="font-medium text-[#315C3B] dark:text-[#8FD69E]">${p.category}</span>
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-medium truncate max-w-[120px]" title="${p.farmOrigin || 'Organic Certified'}">
            🌱 ${p.farmOrigin ? p.farmOrigin.split(' ')[0] + ' ' + (p.farmOrigin.split(' ')[1] || 'Farm') : 'Bio Soil'}
          </span>
        </div>

        <h3 class="font-heading font-semibold text-base text-gray-900 dark:text-white line-clamp-1 mb-1">
          <a href="product-details.html?id=${p.id}" class="hover:text-[#315C3B] dark:hover:text-[#D6A85F] transition-colors">
            ${p.name}
          </a>
        </h3>

        <!-- Rating & Freshness Indicator -->
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-1">
            <span class="text-amber-400 text-xs">★</span>
            <span class="text-xs font-semibold text-gray-700 dark:text-gray-300">${p.rating}</span>
            <span class="text-[11px] text-gray-400">(${p.reviewsCount})</span>
          </div>
          <span class="text-[10px] text-gray-400 dark:text-gray-500">
            ${p.inStock ? '✓ Fresh in Stock' : 'Low Stock'}
          </span>
        </div>

        <!-- Interactive Weight Pills -->
        ${weightPillsHTML}

        <!-- Price & CTA -->
        <div class="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
          <div>
            <div class="text-xs text-gray-400 line-through card-orig-price">$${p.originalPrice ? p.originalPrice.toFixed(2) : (p.price * 1.2).toFixed(2)}</div>
            <div class="text-lg font-bold text-[#315C3B] dark:text-[#D6A85F] font-heading card-active-price">$${p.price.toFixed(2)}</div>
          </div>
          <button 
            type="button"
            onclick="addToCart('${p.id}', '${p.unit || '500g'}', 1, event)"
            class="card-add-btn btn-primary !min-h-[38px] !py-1.5 !px-3.5 text-xs font-semibold rounded-lg shadow-sm"
          >
            <svg class="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            Add
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Interactive weight selection directly on product cards
 */
function selectCardWeight(productId, weightLabel, price, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  const card = document.querySelector(`[data-product-id="${productId}"]`);
  if (!card) return;

  // Toggle active pill classes
  const pills = card.querySelectorAll(".weight-pill");
  pills.forEach(pill => {
    if (pill.getAttribute("data-weight") === weightLabel) {
      pill.classList.remove("bg-gray-100", "text-gray-600", "dark:bg-gray-800", "dark:text-gray-300");
      pill.classList.add("bg-[#315C3B]", "text-white", "dark:bg-[#D6A85F]", "dark:text-[#121614]", "font-semibold");
    } else {
      pill.classList.remove("bg-[#315C3B]", "text-white", "dark:bg-[#D6A85F]", "dark:text-[#121614]", "font-semibold");
      pill.classList.add("bg-gray-100", "text-gray-600", "dark:bg-gray-800", "dark:text-gray-300");
    }
  });

  // Update displayed active price
  const priceEl = card.querySelector(".card-active-price");
  if (priceEl) {
    priceEl.textContent = `$${parseFloat(price).toFixed(2)}`;
  }

  // Update card Add button
  const addBtn = card.querySelector(".card-add-btn");
  if (addBtn) {
    addBtn.setAttribute("onclick", `addToCart('${productId}', '${weightLabel}', 1, event)`);
  }
}

/**
 * Innovative Helper: Add Custom Harvest Box directly to Cart
 */
function addCustomHarvestBox(boxName, boxPrice, cadence, itemsList, event) {
  if (event) event.preventDefault();
  
  const customBoxId = "box-" + boxName.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const customBoxProduct = {
    id: customBoxId,
    name: `${boxName} (${cadence === 'weekly' ? 'Weekly Club Box' : 'One-Time Delivery'})`,
    price: parseFloat(boxPrice),
    originalPrice: parseFloat(boxPrice) * (cadence === 'weekly' ? 1.18 : 1.1),
    weight: cadence === 'weekly' ? 'Weekly Box (15% OFF)' : 'One-Time Box',
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
    quantity: 1
  };

  const cart = JSON.parse(localStorage.getItem("greenharvest_cart") || "[]");
  const existingIdx = cart.findIndex(i => i.id === customBoxId && i.weight === customBoxProduct.weight);

  if (existingIdx > -1) {
    cart[existingIdx].quantity += 1;
  } else {
    cart.push(customBoxProduct);
  }

  localStorage.setItem("greenharvest_cart", JSON.stringify(cart));

  if (typeof updateCartBadges === "function") {
    updateCartBadges();
  }
  if (typeof showToast === "function") {
    showToast(`Added ${boxName} to your cart!`, "success");
  }
}
