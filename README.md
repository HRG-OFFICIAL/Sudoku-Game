# Sudoku Game

Web-based Sudoku game implemented with React, TypeScript, Vite, and Tailwind CSS. The application provides multiple difficulty levels, keyboard controls, hints, undo/redo, real-time validation, statistics, and optional PWA installation.

### Screenshots
<div align="center">
  <img src="screenshots/light01.jpeg" alt="Light theme - main menu" width="45%" style="margin: 10px;">
  <img src="screenshots/light02.jpeg" alt="Light theme - game screen" width="45%" style="margin: 10px;">
</div>
<div align="center">
  <img src="screenshots/dark01.jpeg" alt="Dark theme - main menu" width="45%" style="margin: 10px;">
  <img src="screenshots/dark02.jpeg" alt="Dark theme - game screen" width="45%" style="margin: 10px;">
</div>

## Game Features
- 6 difficulty levels: Easy, Medium, Hard, Expert, Master, Legendary
- Smart hints system: Get help when you're stuck
- Undo/redo: Never lose your progress
- Real-time validation: Instant feedback on mistakes with red error highlighting
- Timer and statistics tracking: Keep track of your solving time and completion statistics
- Achievements: Unlock rewards for milestones
- Keyboard support (navigation and number input): Use arrow keys to navigate and number keys to input numbers
- Clear errors action: Remove all red error highlights from the grid

## Modern UI/UX
- Responsive design for desktop, tablet, and mobile
- Automatic light/dark theme detection with blue accent colors
- Animations via Framer Motion
- Inter font family
- Accessible interactions including keyboard support
- Clear visual separation between 3x3 Sudoku boxes

## Technical Features
- PWA ready (installable)
- Offline play
- Auto-save
- TypeScript throughout
- Modern React (hooks and functional components)
- State management with Zustand
- Conflict detection in the grid

## Tech Stack
- Frontend: React 18, TypeScript
- Styling: Tailwind CSS
- Animations: Framer Motion
- State Management: Zustand
- Build Tool: Vite
- Testing: Vitest, React Testing Library
- PWA: Vite PWA Plugin

## Installation

### Prerequisites
- Node.js 18+
- npm (or yarn)

### Steps
```bash
git clone https://github.com/<user>/<repo>.git
cd Sudoku-Game
npm install
npm run dev
```
Open `http://localhost:5173` or the port shown in the terminal.

### Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview the production build
- `npm run test`: Run tests
- `npm run test:ui`: Run tests with UI
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Fix ESLint findings

## Project Structure
- `src/`: Application source code
  - `components/`: UI components (grid, controls, screens)
  - `store/`: Zustand store and game state
  - `utils/`: Utilities (Sudoku logic, storage, formatting)
  - `constants/`: Shared constants
  - `types/`: Type definitions
- `screenshots/`: Example images used in the README
- `index.html`, `vite.config.ts`, `tsconfig*.json`, `tailwind.config.js`: Build and tooling configuration

## How to Play
1. Start a new game: choose your difficulty and enter your name
2. Fill the grid: click on empty cells and use the number pad or keyboard to enter numbers
3. Use hints: click the hint button when you need help
4. Track progress: monitor your time and statistics
5. Complete the puzzle: fill all cells correctly to win

### Keyboard Shortcuts
- Numbers 1–9: Enter numbers in selected cell
- Arrow keys: Navigate between cells
- Delete/Backspace: Clear selected cell
- U: Undo last move
- R: Redo move
- H: Get hint
- Space: Pause/Resume game

## Game Interface

### Main Components
- Sudoku Grid: 9x9 grid with clear 3x3 box separation
- Number Pad: click numbers or use keyboard
- Game Info: player, difficulty, timer, and pause button
- Game Controls: new game, reset, settings, main menu
- Actions Panel: clear, hint, clear errors, undo, redo
- Statistics: hints used, moves count

### Visual States
- Selected Cell: blue background with white text
- Highlighted Cells: light blue background for related cells
- Error Cells: red background for conflicting numbers
- Hint Cells: yellow background for hint numbers
- Filled Cells: light blue background for original numbers

## Achievements
- First Victory: complete your first puzzle
- Speed Demon: solve a puzzle in under 5 minutes
- Perfectionist: complete a puzzle without mistakes
- Streak Master: win 10 games in a row
- Hint Hater: complete 5 puzzles without hints
- Legendary Player: complete a Legendary difficulty puzzle

## PWA Features
This app can be installed as a Progressive Web App (PWA):
1. Desktop: look for the install button in your browser
2. Mobile: add to home screen from your browser menu
3. Offline: play without internet connection
4. App-like: full-screen experience with native feel

## Testing and Build
```bash
npm run test
npm run build
npm run preview
```
Build artifacts are generated in `dist`.

## License
MIT License. See the [LICENSE](LICENSE) file.
