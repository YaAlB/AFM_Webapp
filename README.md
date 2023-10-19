# Asset Finance Management Web App Setup and Deployment Guide

Welcome to the setup and deployment guide for the Asset Finance Management web app. In this guide, we'll walk you through the steps to set up the app locally and deploy it to a web server for public access.

### Prerequisites

Before you begin, make sure you have the following:

1. **Node.js:** Install [Node.js](https://nodejs.org/) to run JavaScript on the server.

2. **Git:** You'll need [Git](https://git-scm.com/) to clone the app's repository.

3. **Package Manager:** This guide assumes you have npm (comes with Node.js)

4. **GitHub Repository:** Ensure you can access [AFM Webapp](https://github.com/YaAlB/AFM_Webapp) to the GitHub repository containing the app's source code.

## Local Setup

Let's set up the web app on your local development environment:

1. **Clone the Repository:**
   - Open your terminal or command prompt.
   - Navigate to the directory where you want to store the project.
   - Run this command to clone the GitHub repository:

   ```bash
   git clone https://github.com/YaAlB/AFM_Webapp
   ```

2. **Install Dependencies:**
   - Navigate into the project folder:
   
   ```bash
   cd webapp
   ```

   - Install the project dependencies:

   ```bash
   npm install
   ```

3. **Environment Variables:**
   - Create a `.env` file in the project's root directory.
   - Define environment variables including `SENTRY_DSN` and use the following token `https://543180966b7436f763a9aec829bdfbfd@o4506069215608832.ingest.sentry.io/4506069215674368` to capture errors and webapp monitor performance.

4. **Start the Development Server:**
   - Run the development server:

   ```bash
   npm start
   ```

   The app should now be running at `http://localhost:3000` in your browser and you will need to change baseUrl in the apiSlice file to `http://localhost:5500`.

## Deployment

Now, let's deploy the Asset Finance Management web app to a web server. 

5. **Build the App:**

   ```bash
   npm run build
   ```

   This will generate optimized static files in the `build` directory.

### 5.1. Deploying the webapp on [Reader.com](https://reader.com)

To deploy and utilise CI/CD, the react frontend is on [Reader.com](https://reader.com), please follow these steps:

### 5.2. **Log In:**
   - Begin by logging into your [Reader.com](https://reader.com) account.

### 5.3. **Create a Site:**
   - Create a new site. Choose the Node.js option for deploying frontend.

### 5.4. **Connect Your Repository:**
   - Link your GitHub repository to your [Reader.com](https://reader.com) account.

### 5.5. **Configure the Build:**
   - Specify your GitHub branch (usually "master" for production) and set the build command. And, the build command is `npm install && npm start`.

### 5.6. **Set Environment Variables:**
   - Ensure your application's environment variables are properly configured in the [Reader.com](https://reader.com) environment settings.

### 5.7. **Initiate Deployment:**
   - Click the "Deploy" button to start the deployment process.

### 5.8. **Monitor Deployment:**
   - Keep an eye on the deployment progress through real-time logs and status updates available on [Reader.com](https://reader.com).

### 5.9. **Access Your Frontend:**
   - Once the deployment is complete, you'll receive a URL where your react.js webapp is live.

### 5.10. **Continuous Deployment:**
    - Simplify the deployment process by setting up continuous deployment. Any changes you push to the GitHub master branch trigger automatic deployments.

By following these steps, react.js webapp will be up and running on [Reader.com](https://reader.com). It'll be in production mode, ready to serve requests, and enhance the experience for your users. And production website for the project is https://afm.onrender.com/

## Deployment #2

Now, let's deploy the AFM web app to a web server. In this part, we'll use Google Cloud's App Engine to host your React app. 

1. **Build the App:**
   - Create a production-ready build of your app:

   ```bash
   npm run build
   ```

   This will generate optimized static files in the `build` directory.

2. **Google Cloud Setup:**
   - If you don't already have a Google Cloud account, sign up for one.

   - Install and configure the [Google Cloud SDK](https://cloud.google.com/sdk/docs/quickstarts) on your local machine.

3. **App Engine Configuration:**
   - In the root directory of your project, create an `app.yaml` file for configuring your App Engine settings. Here's an example `app.yaml`:

   ```yaml
   runtime: nodejs20
   handlers:
    - url: /
    static_files: build/index.html
    upload: build/index.html

    - url: /
    static_dir: build
   ```

4. **Deploy to App Engine:**
   - Run the following command to deploy your app to Google App Engine:

   ```bash
   gcloud app deploy
   ```

   Follow the prompts to select your project and confirm the deployment.

   Google App Engine will automatically build and deploy your React app. Once the deployment is complete, you'll receive the URL where your app is hosted.

5. **Final Testing:**
   - Visit the URL provided by Google Cloud to ensure that your app is accessible and working as expected.
