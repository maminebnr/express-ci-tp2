# express-ci-tp2
🚀 Express CI TP2

This project is an Express.js application with Continuous Integration (CI) configured using GitHub Actions.
The goal is to automatically verify code quality and run tests on every update.

📌 Prerequisites

Before running the project, make sure you have:

Node.js (version 20 or later)

npm

Git

📥 Installation

Clone the repository and install dependencies:

git clone https://github.com/maminebnr/express-ci-tp2.git
cd express-ci-tp2
npm install

▶️ Run the Application
node server.js


The server runs by default on:

http://localhost:3000

🧪 Run Tests
npm test

🔄 Continuous Integration (CI)

This project uses GitHub Actions to run a CI pipeline automatically.

⚙️ When does the CI run?

On push to the main branch

On pull requests

🛠️ CI Pipeline Steps

The CI workflow performs the following steps:

Checkout the repository

Set up Node.js

Node.js version 20

npm cache enabled

Check Node & npm versions

Install dependencies

npm ci


Run tests

npm test


Start the Express server (sanity check)

node server.js

📁 CI Workflow File

The CI workflow is located at:

.github/workflows/ci.yml

🌿 Git Workflow

Each new feature is developed in a separate branch

After completing the work:

Push the branch to GitHub

Open a Pull Request

The CI pipeline runs automatically before merging

👨‍💻 Technologies Used

Node.js

Express.js

Git & GitHub

GitHub Actions

npm

📄 License

This project is for educational purposes only.
well come back hamza .