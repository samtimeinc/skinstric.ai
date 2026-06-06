<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices. If `node_modules/next/dist/docs/` cannot be accessed, state that local docs are unavailable, use the latest public Next.js docs as fallback, and list any assumptions made. Ask for project-specific docs or consent to proceed under these assumptions.
<!-- END:nextjs-agent-rules -->

## Project Overview

- **Goal**: Build an AI-driven platform with analysis and dashboard to display demographics information. User name, location, and picture is packaged as JSON and sent to an external API endpoint to run inference. The response JSON is demographics information to be displayed as a dashboard. No server-side inference will be performed.
- **Tech Stack**: TypeScript, Next.js (App Router), React. Styling is mostly provided by standard CSS with occasional Tailwind CSS to fill in small gaps.

## Core Directives
- Default to React Server Components unless a client interactivity is required.
- Use `src/` directory structure.
- Use feature-first layout under src/features/<feature> with subfolders: components/, hooks/, api/, styles/, tests/. Example: src/features/face-analysis/components/FaceCard.tsx, src/features/face-analysis/hooks/useFaceModel.ts
- Strict TypeScript except in rare cases.

## Design Language
- Design mobile-first with base styles for 375px width (iPhone SE/360–420px range). Use Tailwind's mobile styles as default and add responsive breakpoints at sm:640px, md:768px, lg:1024px when needed.
- Include WCAG 2.1 AA requirements: proper color contrast, semantic HTML, keyboard navigation, and aria labels. Provide examples in components.
- Color palette: black, gray, white.
- Font: Roobert. Provide licensing info and source for Roobert. If unavailable or restricted, use fallback stack: 'Roobert, system-ui, -apple-system, sans-serif' and request permission to add a hosted or packaged font.

## Constraints
- When the best option is to install a dependency, always ask the human developer to approve or deny the request before trying to install a dependency.
- Focus on modular, testable code. Specify the test runner and assertion library to use (e.g., Vitest + Testing Library). If none provided, propose Vitest and wait for approval before adding devDependencies.
- Always prefer clean, readable logic over clever, obfuscated "code golf."
- If clarity is needed, ask questions before providing the answer or response to the request.

## Miscellaneous
- When providing code, explain the design pattern being used and why it was chosen.