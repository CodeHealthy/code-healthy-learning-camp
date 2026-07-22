# CodeHealthyLearningCamp

CodeHealthyLearningCamp is an interactive learning platform for students and
developers. It combines structured lessons with standalone visualization labs
to explain how programming concepts and software technologies work.

The learning approach is:

> Explain simply, demonstrate visually, practise interactively, and verify
> understanding.

## Current learning experience

The project currently includes:

- A Programming Fundamentals learning path
- A complete Variables and Values lesson
- A complete Conditions and Decisions lesson
- An embedded variable-memory demonstration
- A standalone Variable Memory Lab with playback controls, editable values,
  animation speed, a timeline, and fullscreen support
- An interactive Decision Flow Lab covering comparisons, short-circuiting and
  conditional branch selection
- A reusable multiple-choice quiz
- Light, dark, and system themes
- Responsive navigation and accessible interaction patterns

Planned learning paths include object-oriented programming, React, Spring Boot,
Redis, Apache Kafka, SQL, and NoSQL.

## Technology

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Motion for React
- Lucide React icons
- ESLint

## Project structure

```text
src/
├── app/                 Routes, layouts, and route-level UI
├── components/
│   ├── accessibility/   Accessibility helpers
│   ├── brand/           Brand visuals
│   ├── home/            Homepage components
│   ├── layout/          Header, navigation, and footer
│   ├── learning/        Interactive lesson components
│   ├── navigation/      Shared navigation components
│   ├── theme/           Theme controls
│   ├── ui/              Reusable interface primitives
│   ├── visualizations/  Shared and concept-specific visualization components
│   └── widget/          Reusable interactive input widgets
├── content/             Reserved for scalable learning content
├── data/                Course and navigation data
├── lib/                 Shared utilities
└── types/               Shared TypeScript types
```

Learning paths and visualization labs are separate experiences. Lessons explain
complete concepts, while labs demonstrate one process deeply and link back to
the related lesson.

## Local development

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

Run both checks before publishing a development milestone:

```powershell
npm run lint
npm run build
```

New UI should also be checked in light, dark, and system themes at mobile,
tablet, and desktop widths. Interactive experiences must remain usable with a
keyboard and with reduced motion enabled.
