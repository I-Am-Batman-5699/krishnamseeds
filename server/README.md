/your-project
│── /model
│   ├── /json                   # JSON files storage
│   │   ├── appData.json
│   │   ├── contacts.json
│   │   ├── about.json
│   │   ├── productList.json
│── /controllers
│   ├── dataController.js        # Handles fetching JSON data
│── /middlewares
│   ├── authMiddleware.js        # API Key & Credentials validation
│── /routes
│   ├── dataRoutes.js            # Routes for appData, contacts, about, productList
│   ├── protectedRoutes.js       # Routes for protected endpoints
│── /utils
│   ├── logger.js                # Logging utilities (optional)
│── /config
│   ├── env.js                   # Centralized environment config (optional)
│── /tests
│   ├── dataRoutes.test.js       # Unit tests for data routes
│   ├── authMiddleware.test.js   # Tests for authentication middleware
│── /public                      # Publicly accessible assets
│   ├── /icons                   # All app icons
│   │   ├── appIcon1.png
│   │   ├── appIcon2.svg
│   ├── /images                  # General images like logos, backgrounds
│   │   ├── logo.png
│   │   ├── banner.jpg
│   ├── /json                    # Message-related JSON data
│   │   ├── messages.json
│── /assets                      # Media assets for products, about, and contact sections
│   ├── /products                # Product-specific assets
│   │   ├── /images
│   │   │   ├── product1.jpg
│   │   │   ├── product2.jpg
│   │   ├── /videos
│   │   │   ├── productDemo1.mp4
│   │   ├── /docs
│   │       ├── productManual1.pdf
│   ├── /about                   # About section assets
│   │   ├── /images
│   │   │   ├── about1.jpg
│   │   ├── /videos
│   │   │   ├── aboutVideo.mp4
│   │   ├── /docs
│   │       ├── aboutDetails.pdf
│   ├── /contact                 # Contact section assets
│   │   ├── /images
│   │   │   ├── contact1.jpg
│   │   ├── /videos
│   │   │   ├── contactDemo.mp4
│   │   ├── /docs
│   │       ├── contactInfo.pdf
│── .env                         # Environment variables
│── .gitignore                   # Ignore node_modules, .env, etc.
│── package.json                 # Project dependencies
│── server.js                    # Main entry point
│── README.md                    # Project documentation


```
npm install bcrypt cors dotenv express jest nodemon supertest winston axios emailjs nodemailer serverless-http
```