# GEMINI.md

## Project Overview

This project is a social application designed to connect users through communities, live interactions, and personal connections. The application is structured around three core pillars:

*   **Communities (Spaces):** Interest-based groups where users can engage in live rooms, chat rooms, and events.
*   **Live Interaction:** Real-time video and audio rooms for various activities like panel discussions, dating sessions, and classes. This is also the primary monetization engine through gifting, subscriptions, and visibility boosts.
*   **Connection Layer:** Features that allow users to connect with each other through direct messaging, matching, and following.

The application's navigation is designed to be intuitive, with a bottom navigation bar that includes Home, Communities, Live, Messages, and Profile.

## Building and Running

**TODO:** Add instructions on how to build, run, and test the project. This should include any necessary commands and environment setup.

## Development Conventions

The project follows a strict design system based on **Google's Material Design 3 (M3)**. The goal is to create a web application interface that is indistinguishable from a native Google internal tool or a flagship Google Workspace application.

### Key Design Principles

*   **Typography:** Google Sans for headings and Roboto for body text.
*   **Color System:** M3 Dynamic Color logic with Google Blue (#1a73e8) as the primary color.
*   **Layout & Grid:** High-density layout with an 8px baseline grid.
*   **Components:** Material Design 3 components for buttons, icons, and inputs.
*   **Motion & Interaction:** Standard easing and ripple effects for all transitions.

### "Google-isms" to Follow

*   **Waffle and Search:** A global header with a centered, pill-shaped search bar and the 3x3 grid "Waffle" menu icon.
*   **White Space is a Feature:** Use tonal elevation and thin borders instead of heavy shadows.
*   **Iconic Visuals:** Use the Material Symbols (Outlined) library for icons.
*   **Typography Scale:** Adhere to the specified typography scale for headings, sub-headings, body text, and button text.

### Implementation

To ensure consistency with the design system, use the Google CDN to import the necessary fonts and icons:

```html
<link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
```
