# Lead Management System

A lightweight lead management application built with React and TypeScript, focusing on clean architecture, performance, and maintainability.

## Project Overview

This system demonstrates a close to production ready approach to building scalable applications. It allows users to manage leads, convert them to opportunities, and track their sales pipeline effectively, with attention to user experience and responsiveness. The nice to haves were: localStorage persistence of the filters, responsive design. I focused on not using many third party libraries for the scope of the assessment too, but tried to replicate what it would have looked like with them.

## Key Features

- **Lead Management**: View, search, and filter leads with real-time updates  
- **Lead Conversion**: Convert qualified leads to opportunities with detailed tracking  
- **Advanced Filtering**: Persistent search and status filters with localStorage  
- **Inline Editing**: Edit lead information directly in the interface  
- **Score-Based Sorting**: Dynamic sorting by lead scores with visual indicators  
- **Responsive Design**: Optimized for all devices  
- **Validation**: Form validation with Zod schemas  

## Architecture & Design

### Minimal Dependencies

- Bootstrap icons instead of heavy icon libraries  
- Headless UI for accessible primitives without styling overhead  
- Native APIs like localStorage for state persistence  

### Clean Architecture

- **Component Composition**: Reusable UI primitives under `/components/ui`  
- **Context-Based State**: Centralized data management with React Context  
- **Utilities**: Modular, single-purpose utility functions  
- **Type Safety**: Comprehensive TypeScript usage with Zod for runtime validation  

### Project Structure
```
src/
├── components/ # Feature components
├── components/ui/ # Reusable UI primitives
├── components/icons/ # Custom SVG icons
├── store/ # State management
├── types/ # TypeScript definitions
├── utils/ # Utility functions
└── assets/ # Static data
```

## Technology Stack

- **React 19**: Leveraged for the latest features, including improved ref forwarding strategies  
- **TypeScript**: Type safety and developer experience  
- **Vite**: Fast build tool with optimized bundling  
- **TailwindCSS**: Utility-first styling  
- **Headless UI**: Accessible, unstyled component primitives  
- **Zod**: Runtime type validation  
- **React Context + localStorage**: State management and persistence  

## Design Philosophy

- **Custom Color Palette**: Accessibility and contrast  
- **Modern UI**: Clean, minimalist interface inspired by contemporary design systems  
- **Single Responsibility Components**: Clear, focused purpose per component  
- **Reusable Primitives**: Composable building blocks for complex interfaces  

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

Key Implementation Highlights

State Management: Context API with localStorage persistence, optimistic updates, and error handling

Type Safety: Strict TypeScript types and Zod schemas for validation

Performance: Memoized computations, callback optimizations, minimal re-renders, and tree-shaking via Vite

Development Approach

Planning: Technology chosen for scalability and maintainability

Architecture: Modular, clean, and extensible structure

Implementation: Separation of concerns, type safety, and accessibility

Optimization: Performance-conscious practices with minimal dependencies

Maintainability: Readable code and reusable components
