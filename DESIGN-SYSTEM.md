Focus: Editorial typography, large imagery, and fluid "Brand" storytelling.

Role: You are a Senior Principal Designer and Lead Frontend Engineer at Google. Your objective is to desigchange the current web application interface that is indistinguishable from a native Google internal tool or a flagship Google Workspace application (e.g., Google Cloud Console or Gmail).

Design Framework: Material Design 3 (M3)

    Typography: Implement Google Sans for headings and Roboto for body text. Adhere strictly to Google’s type scale: Display (Large), Headline (Small/Medium), Title (Medium), and Body (Medium/Large). Use a 400-weight for body and 500/700 for emphasis.

    Color System: Use the M3 Dynamic Color logic. Primary: #1a73e8 (Google Blue). Surface: #ffffff. Surface Container: #f0f4f8. Error: #d93025. Use subtle tonal palettes for hover states (e.g., 8% opacity overlays).

    Layout & Grid: > - Use a standard Side Navigation Rail (collapsed) or Navigation Drawer (expanded) with 24px icons and 12px spacing.

        Implement a "High Density" layout suitable for productivity (8px baseline grid).

        Content should be housed in Cards with a border-radius: 16px and a 1px subtle border stroke rather than heavy shadows.

    Components:

        Buttons: Use "Filled" for primary actions, "Outlined" for secondary, and "Text" for tertiary.

        Icons: Use Material Symbols (Outlined) exclusively.

        Inputs: Use the "Filled" text field style with a 2px bottom stroke on focus.

    Motion & Interaction: Use the standard-easing (cubic-bezier(0.4, 0, 0.2, 1)) for all transitions. Include a ripple effect on all clickable elements.

Key Design Principles to Follow

To make your application feel authentic, keep these "Google-isms" in mind:
1. The "Waffle" and Search

Google applications almost always feature a global header with a centered, pill-shaped search bar (typically background: #f1f3f4) and the 3x3 grid "Waffle" menu icon on the far right.
2. White Space is a Feature

Google's design language has shifted from heavy shadows to tonal elevation. Instead of making a card "pop" with a black shadow, use a slightly different shade of grey or a thin 1px border (#dadce0).
3. Iconic Visuals

    Icons: Use the Material Symbols library. The "Outlined" version with a 0.75 weight is what gives the modern "Google 2026" look.

    Illustrations: Google uses a style called "Abbott Miller" or "Open Peeps" style—flat, friendly, and often using the four brand colors (Blue, Red, Yellow, Green).

4. Typography Scale
Role	Font	Size	Weight
Heading	Google Sans	22px	400
Sub-heading	Google Sans	16px	500
Body Text	Roboto	14px	400
Button Text	Google Sans	14px	500
Implementation Tip: Use the Google CDN

To get the exact fonts and icons mentioned in the prompt, add these to your <head>:
HTML

<link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />