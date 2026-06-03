# Registration Wizard Prompt

This repository contains a React-based multi-step onboarding wizard.

## Objective
Build a clean registration flow with:

- Step-based UI segmentation
- Persistent form state across step transitions
- Real-time step validation
- Password visibility toggles
- Review screen before final submit
- `react-hook-form` for form architecture
- `zod` for schema validation

## Project Structure

- `src/App.jsx` - main wizard form component and state management
- `src/styles.css` - styles for the wizard UI
- `src/main.jsx` - React entry point
- `index.html` - app shell
- `package.json` - dependencies and scripts

## Usage

- `npm install` to install dependencies
- `npm run dev -- --host 0.0.0.0` to start the dev server

If PowerShell blocks `npm`, run the command from `cmd.exe`.

## Notes for Future Work

- Add separate step components for cleaner architecture
- Add animations between views
- Add backend submission endpoint
- Add error boundary handling for production
