
import type { InventoryItem } from "@/types/inventory";

const categories = [
  "Electronics",
  "Apparel",
  "Home & Kitchen",
  "Sports",
  "Beauty",
];

const productNames = [
  "Wireless Headphones",
  "Cotton T-Shirt",
  "Storage Organizer",
  "Running Shoes",
  "Face Moisturizer",
  "Bluetooth Speaker",
  "Denim Jacket",
  "Kitchen Blender",
  "Yoga Mat",
  "Skin Cleanser",
  "Smart Watch",
  "Casual Sneakers",
  "Desk Lamp",
  "Water Bottle",
  "Hair Conditioner",
  "USB-C Charger",
  "Travel Backpack",
  "Coffee Maker",
  "Fitness Bands",
  "Sunscreen Lotion",
];

const adjectives = [
  "Essential",
  "Premium",
  "Classic",
  "Modern",
  "Everyday",
  "Pro",
  "Compact",
  "Advanced",
];

const DAY_MS = 24 * 60 * 60 * 1000;
const START_DATE = Date.UTC(2024, 0, 1);

export const MOCK_INVENTORY: InventoryItem[] = Array.from(
  { length: 50_000 },
  (_, index) => {
    const price = Number(
      (12 + ((index * 7919) % 100_000) / 100).toFixed(2),
    );


    const stockQuantity = (() => {
      const pattern = index % 100;
      if (pattern < 5) return 0;
      if (pattern < 20) return 1 + ((index * 7) % 19);
      if (pattern < 65) return 20 + ((index * 13) % 81);
      return 101 + ((index * 17) % 400);
    })();


    const lastUpdated = new Date(
      START_DATE + (index % 1000) * DAY_MS,
    ).toISOString();

    return {
      sku: `AUR-${String(index + 1).padStart(6, "0")}`,
      productName: `${adjectives[index % adjectives.length]} ${
        productNames[(index * 7) % productNames.length]
      }`,
      category: categories[(index * 3) % categories.length],
      price,
      cost: Number((price * 0.65).toFixed(2)),
      stockQuantity,
      reorderLevel: 20 + ((index * 11) % 31),
      lastUpdated,
    };
  },
);
