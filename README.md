# Striker Brand

[![Build](https://github.com/Sam-Striker/my-portfolio-server/actions/workflows/node.js.yml/badge.svg)](https://github.com/Sam-Striker/my-portfolio-server/actions/workflows/node.js.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/275d7597be91e8b41f12/maintainability)](https://codeclimate.com/github/Sam-Striker/my-portfolio-server/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/Sam-Striker/my-portfolio-server/badge.svg)](https://coveralls.io/github/Sam-Striker/my-portfolio-server)

My personal portfolio website

![image](https://user-images.githubusercontent.com/85891662/153346345-0687bdcf-69fa-4dd3-8120-046e91e68bfc.png)

# API Endpoints included

### User

- **POST /api/v1/user/register:** Create an account
- **POST /api/v1/user/login:** Log into your account

### Blog

- **POST /api/v1/blog/create:** Create a Blog post
- **GET /api/v1/blog/getPost/:blogID:** Fetch a single Blog post
- **GET /api/v1/blog/getAll:** Fetch all blogs
- **POST /api/v1/blog/comment/:blogdID:** Create a comment on a single Post
- **PATCH /api/v1/blog/update/:blogdID:** Update a single Post
- **DELETE /api/v1/blog/delete/:blogdID:** Delete a post


# [Documentation](https://striker-server.herokuapp.com/api/v1/documentation/#/)

# Installation and Environment Setup

**Clone the repository from [Github](https://github.com/Sam-Striker/my-portfolio-server.git).**

( You will need **Git** for this if you are running a Windows PC, Get it [HERE](https://git-scm.com/) )

```
git clone https://github.com/Sam-Striker/my-portfolio-server.git
```

**To Install all dependencies:**

```
npm install
```

**To run the tests:**

```
npm run test OR npm run cover
```

**Now to start the app:**

```
npm run start
```

**To start the app in development mode:**

( You need **nodemon** installed for this, run `npm i -g nodemon` to install it )

```
npm run dev
```

# Tools used

- Server-Side Framework: **Node/Express**
- Testing framework: **Mocha/Chai**

# More Tools

- Continuous integration: **[Github Actions]**
- ES6 Transpiler: **[Babel](babeljs.io)**
- Test coverage: **[nyc](https://www.npmjs.com/package/nyc)**
- Maintainability: **[Code climate](https://codeclimate.com)**
- Deployment: **[Heroku](https://www.heroku.com)** and **[Netlify](https://www.netlify.com/)**

# Deployments

- The UI template is hosted on Netlify at https://samuel-mupagasi.netlify.app/

- The API is hosted on Heroku at https://striker-server.herokuapp.com/

# Author:

**Samuel Mupagasi**
