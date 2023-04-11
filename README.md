## Watch the muted youtube video of all changes

[![Watch the video](https://img.youtube.com/vi/R2_T4pLGm-A/maxresdefault.jpg)](https://youtu.be/R2_T4pLGm-A)

## Updated Chainlist

# Changelog:

1. Added ability to copy RPC link to clipboard after clicking on the link text
2. Added an effect of adding icon to the clipboard when hovering over a cell with a link
3. Added effect of highlighting a cell with color when pointing with cursor
4. Added animation of adding a link to the clipboard
5. Fixed bug when switching to dark mode, scrolling remained always white in chrome. Now when you change the theme, scrolling is always in the theme color
6. Added full screen mode, side menu folds into side menu. Looks much more convenient, especially for laptops.
7. Tables on mobile resolution became more organic.
8. Small bugs on mobile resolution.
9. Added remembering the position of the side menu or full screen mode in localStorage.

# Motivation 1

I really dislike horizontal scrolling in tables, so my main motivation was to get rid of them.

# Motivation 2

It really annoyed me when I was doing a multichain project and to copy the RPC I had to add the metamask to the blockchain first and then copy the RPC. This update makes it much more convenient.

## Decision

Take the best, leave the rest

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Adding your RPC

If you wish to add your RPC, please follow the [PR template](https://github.com/DefiLlama/chainlist/blob/main/pull_request_template.md)
