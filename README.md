# Aura Engine

Aura Engine is an enterprise inventory dashboard built with Next.js, React, TypeScript, and Tailwind CSS.

It demonstrates how a large inventory can be searched, filtered, sorted, and analyzed through a clean, responsive interface.

## Features

- **Inventory management:** Browse 50,000 mock products with pagination of 50 records per page.
- **Global search:** Search inventory by product name or SKU with a 500 ms debounce.
- **Advanced filters:** Filter by category, stock level, and price range.
- **Sortable table:** Sort inventory columns and use sticky table headers.
- **Command Center:** View inventory KPIs, restock priorities, and valuation by category.
- **CSV export:** Download inventory records matching the selected filters.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts

## Getting Started

### Prerequisites

Install Node.js and npm.

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone <your-repository-url>
cd <your-project-folder>
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

Replace the repository URL and folder placeholders with your actual values.

## Data and API

This capstone frontend uses a deterministic mock dataset containing 50,000 inventory products and local Next.js API routes to demonstrate inventory operations.

It does not connect to a production database. The mock API is intended for frontend development and demonstration.

## Verification

Run the production build:

```bash
npm run build
```

## Project Scope

This project focuses on the frontend experience, inventory interactions, analytics visualizations, and CSV export. It does not include the separate backend implementation.