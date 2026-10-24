# Action Detectives

[Türkçe](README.md)

An offline classroom card game for practising English classroom language, countries and nationalities through pictures. GitHub repository: [action-detectives](https://github.com/erhankoclar/action-detectives).

## Usage

Open `index.html` in Chrome or Edge. No installation, internet connection or server is required. Preserve the folder structure.

1. Choose **CLASSROOM LANGUAGE** (16 cards) or **COUNTRIES & NATIONALITIES** (14 cards) at launch.
2. Use **Start**, then **Next**, to select cards. The Space key also starts a selection.
3. A three-second random picture animation ends on the next card in the shuffled deck. The existing transition and finale sounds are preserved.
4. Country cards display the corresponding question from the Word document below the picture at the same time. Classroom cards have no additional question.
5. **Change category** returns to category selection. Each category keeps its completed progress separately. Category selection appears on every launch.

## Deck order and persistence

The first category selection creates a Fisher–Yates shuffled deck. Every card is selected exactly once per round, in that order. Completing a round creates a different order, with no immediate repeat across the round boundary. Random animation frames do not affect deck order.

Each category stores its deck, next position and last completed card in `localStorage`. Returning to the same browser and file location resumes progress after choosing the category. The game remains usable for the session if browser storage is blocked. The old fixed-order save is no longer used.

**Reset** creates a fresh deck for the current category and preserves sound preferences. Reset, changing category or hiding the tab cancels an unfinished selection and stops its sounds without consuming a card. Fullscreen, volume and mute controls are preserved.

## Files

- `index.html`: interface, categories, question mapping, shuffle, persistence and audio.
- `resimler/classroom-language/`: 16 classroom pictures named after their actions.
- `resimler/countries-nationalities/`: 14 unique pictures named after their people and countries. Removed 13 exact duplicates; renamed the old `mısır` file to `zaha-hadid-iraq.jpeg` to match the Iraqi flag shown.
- `docs/ingilizce_resimli_sorular.docx`: source document for all 14 questions, preserving their original wording.
- `ses/`: the two original MP3 files.
- `tests/check-game.cjs`: focused real-Chrome checks for categories, deck order, reshuffling, persistence, cancellation and screen sizes. Run `node tests/check-game.cjs` in an environment with Node.js and Playwright installed.
- `docs/PLAN.md` and `docs/TEST_RAPORU.md`: historical plan and test report for the earlier version.

To add a card, place its image in the category folder and add its filename and optional `text` to `categories` in `index.html`. Changing the card count automatically replaces incompatible saved progress with a new deck.

## License

Released under the [MIT license](LICENSE). Copying, modification, distribution and commercial sales are permitted provided the copyright and license notice are retained. Third-party rights in supplied images and audio remain with their respective owners.
