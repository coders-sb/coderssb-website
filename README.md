# Coders SB Website

# How to set up a local version of the website: 

- Clone the repo using the git clone command
- Navigate to the repo in your terminal and type:
  - **npm install**. This will install all the necessary node modules used by the wesbite
  - **npm run dev**. This will start up a local instance of the website, usually on localhost:3000. Navigate to your web browser to see the local version of the website.
  
 # Implementing a Feature
 
 - Make sure to a card on the **Kanban board** under the *Projects* tab at the top that has bullet-point details in its body before you start coding. This is important so that future Coders SB officers can see at a glance what features have been built into the website
 - **Make sure you are never working directly on master** always work on your own branch and open a PR
  - **Link your PRs with the card on the Kanban Board** there should be an option to do so on the right side of the page for your open PR. Move your card on the Kanban Board to the "Under Review" column
 - After your PR has been reviewed by at least 1-2 other officers, you may merge your work
 - Once your PR has been approved, close the issue on the kanban board and move it to the "Done" column

# Building, exporting and deploying

- `npm run build`: generates an optimized version of the website under `./.next`
- `npm run export`: builds then exports entire application to static HTML under `./out`
- `npm run deploy`: builds, exports, then commits and pushes `./out/*` to the `gh-pages` branch on remote
  - `npm run deploy -- -m "message"` adds a message to commit that is pushed to `gh-pages`

# Testing a production build on your fork

While on a fork, you can test the website in production by publishing it to your fork's GitHub Pages site.

1. Create a new branch named `gh-pages` in your fork
2. On your fork, under `Settings > Pages`, deploy the newly created gh-pages branch from root.
3. Go to the branch that you want to test on a local copy of your fork.
4. Add two lines to `next.config.js` as shown below.
```
    ...
    GOOGLE_CLIENT_ID:
      process.env.GOOGLE_CLIENT_ID
  },
+ basePath: "/coderssb-website",
+ assetPrefix: "/coderssb-website"
});
```
Do NOT push this change to the main repository, since it will break stylesheet references.

4. Deploy using `npm run deploy` (this will automatically push to `gh-pages` on your fork).
5. View site at `<username>.github.io/coderssb-website` (this may take a couple minutes).