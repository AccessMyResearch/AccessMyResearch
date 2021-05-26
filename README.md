# AccessMyResearch
AccessMyResearch is a BootstrapVue + Vue.js web application designed to connect users with researchers, increase access to publications, & act as a space for teams to work on research-related projects.

# Project Goals
AccessMyResearch aims to increase the accessibility of research to all people by allowing users to:
1. Create an account for free
1. Gain access to publications and research from academics from all over the world
1. Ask questions & discuss with experts from top universities
1. Organize inspiring publications into shareable, named collections
1. Develop projects with other users where the group's research can be uploaded

# Getting Started
1. [Set up a Development Environment](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Getting-Started#setting-up-a-development-environment)
1. [Set up Git](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Using-Git#setting-up-git)
1. [Clone the Repo & Install Project Dependencies](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Getting-Started#getting-started-in-the-cli)
1. [Set up Docker](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Containerized-virtualization-with-Docker#getting-started-with-docker)

# Useful Commands
1. `npm install` - Installs all dependencies
1. `npm ci` - Removes all dependencies and installs them all cleanly
1. `npm npm install --save google-spreadsheet` - installs google spreadsheet API
1. `npm install --save http2`- installs google spreadsheet API
1. `npm install googleapis@39  --save` - installs google spreasheet API
1. `npm run build` - Builds the code
1. `npm run dev` - Automatically builds all changes & runs the code locally/on network
1. `npm test` - Runs the code test suites (with Jest)
1. `npm run serve` - Serves the code (not going to be useful for a while)
1. `npm run lint` - Starts the Vue linter

# [AccessMyResearch Wiki](https://github.com/AccessMyResearch/AccessMyResearch/wiki)
Contributing | Codebase
-- | --
**[Using Git](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Using-Git)** | **[Core Technologies & Dependencies](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Core-Technologies-&-Dependencies)**
**[Getting Started](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Getting-Started)** | **[Containerized Virtualization with Docker](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Containerized-virtualization-with-Docker)**
**[How to Contribute](https://github.com/AccessMyResearch/AccessMyResearch/wiki/How-to-Contribute)** | **[Server Hosting by AWS](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Server-Hosting-by-AWS)**
**[Project Files](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Project-Files)** | **[Elasticsearch](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Elasticsearch)**
**[Solving Common Issues](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Solving-Common-Issues)** | **[Testing with Jest](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Testing-with-Jest)**

# Important Notes
1. Comments indicating what needs to be done should begin with `TODO:`, so these comments can be easily searched for instead of getting buried and forgotten about.
   * In JavaScript: `//TODO: Replace dummy data with entries from database`
   * In HTML/Vue.js: `<!--TODO: Replace dummy data -->`
1. In Vue.js, don't specify the location of the src folder when importing, instead use the `@` symbol. It dynamically points to the src folder of the Vue.js project.
1. Avoid creating new colors, fonts, or sizes. Check what theme colors you can use and other project styling globals at `src/assets/custom/_variables.scss`
1. Looking to implement a new component? First, check the `src/components/` folder. It is always best to use the components that have already been properly implemented.

   > Still need a new component? Check out [BootstrapVue Components](https://bootstrap-vue.org/docs/components) or [Element Components](https://element.eleme.io/#/en-US/component/layout).
1. Avoid adding redundant dependencies. See [what each dependency does](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Core-Technologies-&-Dependencies#web-app-dependencies) before you add a new one.
1. If you encounter an issue, [check to see if there is a solution](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Solving-Common-Issues#solutions-to-common-issues)

   > Be sure to [document the solution to your problem](https://github.com/AccessMyResearch/AccessMyResearch/wiki/Solving-Common-Issues#solutions-to-common-issues) if you think others might encounter it too.