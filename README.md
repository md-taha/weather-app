Cloud-Native CI/CD Deployment with GitHub Actions, Docker & Kubernetes
Overview
This project demonstrates a CI/CD pipeline for a Node.js-based Weather App, integrating GitHub Actions, Docker, and Kubernetes for automated testing, containerization, and deployment.

Initially, the project was deployed on AWS EKS (Elastic Kubernetes Service). Still, due to cost constraints as a student, I have switched the deployment to Minikube, allowing local Kubernetes testing and deployment.

Tech Stack
CI/CD: GitHub Actions
Containerization: Docker
Orchestration: Kubernetes (Minikube)
Cloud (Previous Setup): AWS EKS
Features
✅ Automated CI/CD pipeline with GitHub Actions
✅ Dockerized application for portability
✅ Kubernetes setup with Deployments & Services
✅ Load balancing and scaling with Kubernetes
✅ Local Kubernetes deployment using Minikube

Project Structure
plaintext
Copy
Edit
├── src/                 # Node.js app source code  
├── Dockerfile           # Docker containerization  
├── k8s/  
│   ├── deployment.yaml  # Kubernetes deployment  
│   ├── service.yaml     # Kubernetes service  
├── .github/workflows/  
│   ├── ci-cd.yaml       # GitHub Actions pipeline  
└── README.md            # Documentation  

Setup & Deployment (Minikube)
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-repo/weather-app.git
cd weather-app
2. Start Minikube
bash
Copy
Edit
minikube start
3. Build & Push Docker Image
bash
Copy
Edit
docker build -t weather-app .
4. Deploy to Kubernetes
bash
Copy
Edit
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
5. Get Service URL
bash
Copy
Edit
minikube service weather-app-service --url
CI/CD Pipeline
The GitHub Actions workflow (.github/workflows/ci-cd.yaml) automates:

Code Checkout & Testing – Runs tests on every push.
Docker Image Build & Push – Builds the image and stores it.
Kubernetes Deployment – Applies updated configurations to Minikube.
Why Switch from AWS EKS to Minikube?
AWS EKS provides scalability, resilience, and managed Kubernetes services, but incurs high costs. Since I am a student, Minikube is a more cost-effective solution for testing Kubernetes deployments locally while keeping the same Kubernetes configurations.

Future Improvements
Automate Helm chart setup
Integrate monitoring tools like Prometheus & Grafana
Improve security with role-based access control (RBAC)
Conclusion
This project showcases real-world DevOps practices by integrating CI/CD, Docker, and Kubernetes, making deployments automated, scalable, and efficient.
