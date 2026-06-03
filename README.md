# Registration Wizard

A modern React + Vite onboarding wizard built as a segmented enterprise form.

## Overview

This project implements a three-step registration flow with step-level validation and state persistence across views.

### Steps
1. Personal Info
   - First Name
   - Last Name
   - Date of Birth
2. Account Details
   - Email
   - Password
   - Confirm Password
3. Review & Submit
   - Summary of captured values

## Features

- Multi-step wizard navigation with `Next` and `Back`
- Form state lifted to the parent component
- Step-specific real-time validation using `react-hook-form`
- Schema validation with `zod`
- Show/hide password toggles
- Progress indicator at the top
- Successful submit shows a success panel and logs the final payload

## Getting Started

### Install

```bash
cd "c:\Users\giriv\OneDrive\Desktop\sprint scope"
npm install
```

### Run

Use `cmd.exe` if PowerShell blocks `npm` scripts:

```cmd
cmd.exe /c "cd /d c:\Users\giriv\OneDrive\Desktop\sprint scope && npm run dev -- --host 0.0.0.0"
```

Then open:

- `http://localhost:5173/`

### Build

```bash
npm run build
```

## Notes

- If PowerShell blocks `npm`, use `cmd.exe` or update PowerShell execution policy.
- The app is intentionally built with enterprise-friendly form architecture.
