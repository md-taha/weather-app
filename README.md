CI/CD Pipeline for Weather App with Minikube and Kubernetes::

This repository sets up a CI/CD pipeline using GitHub Actions for a weather app. The pipeline automates testing, building, and deploying the app into a Minikube cluster with Kubernetes.


Pipeline Overview
The pipeline consists of two main jobs:

Test: Ensures the app works correctly by running unit tests.
Build and Deploy: Builds the Docker image, sets up Minikube, and deploys the app to Kubernetes.


Triggers:
Pull Requests to the main branch.
Pushes to the main branch.

Job 1: Test
Checkout Code: The pipeline first checks out the repository's code.
Set up Node.js: Installs Node.js version 16 to run JavaScript tests.
Install Dependencies: Installs the necessary dependencies using npm install.
Fix Permissions: Ensures that the Jest binary is executable.
Run Tests: Runs unit tests using Jest to verify code correctness.

Job 2: Build and Deploy
Checkout Code: Again, checks out the code to ensure the latest changes are used.
Install Minikube: Installs Minikube on the GitHub runner, which is used to create a local Kubernetes cluster.
Start Minikube: Starts Minikube with Docker as the driver, allowing Kubernetes to run locally.
Set up Docker for Minikube: Configures the Docker environment to use Minikube's Docker daemon, enabling the build and deployment of the image within Minikube.
Build Docker Image: Builds the Docker image (weather-app:latest) using the Dockerfile in the repository.
Load Docker Image into Minikube: Loads the newly built Docker image into Minikube so it can be used by the Kubernetes deployment.
Install kubectl: Installs kubectl, the Kubernetes command-line tool, which is used to interact with the Kubernetes cluster.
Deploy to Kubernetes: Applies the Kubernetes configuration files (deployment.yaml, service.yaml) to deploy the app and create the service.
Check Deployment Status: Verifies that the deployment is successful by checking the Kubernetes pod and service status.
Notify Deployment Status: Provides a message indicating whether the deployment was successful or failed.
Get Minikube Service URL: Retrieves the Minikube IP and the service’s node port to provide the URL where the app is accessible.



Kubernetes Configuration
deployment.yaml: Defines how the weather app should be deployed in the Kubernetes cluster, including the number of replicas and the container's port.

Example:
apiVersion: apps/v1
kind: Deployment
metadata:
  name: weather-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: weather-app
  template:
    metadata:
      labels:
        app: weather-app
    spec:
      containers:
      - name: weather-app
        image: weather-app:latest
        ports:
          - containerPort: 3000



service.yaml: Exposes the app to the outside world via a Kubernetes NodePort service, allowing access through the Minikube IP and port.



Accessing the Deployed App
After deployment, you can access the app by visiting the Minikube IP and the exposed port:
http://<MINIKUBE_IP>:<MINIKUBE_PORT>
