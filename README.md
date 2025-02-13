# AWS ECS Fargate Deployment with Terraform



This project deploys a **Node.js REST API** on **AWS ECS Fargate** using **Terraform**. It provisions an **ECR repository**, **ECS cluster**, **Application Load Balancer (ALB)**, and required networking components.

## 🚀 Prerequisites

Ensure you have the following installed on your machine:

- [Terraform](https://developer.hashicorp.com/terraform/downloads)
- [AWS CLI](https://aws.amazon.com/cli/)
- [Docker](https://www.docker.com/)
- AWS credentials configured (`aws configure`)

---

## 📌 Setup Instructions

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-repo-name.git
cd terraform
```

### 2️⃣ Authenticate AWS CLI

```sh
aws configure
```

Set up your **AWS Access Key, Secret Key, Region**, and **Output format**.

---

## 🏗 Deployment Steps

### 3️⃣ Initialize Terraform

```sh
terraform init
```

### 4️⃣ Validate and Plan

```sh
terraform plan
```

This will show the resources that will be created.

### 5️⃣ Deploy Infrastructure

```sh
terraform apply -auto-approve
```

This process takes a few minutes. After completion, it outputs the **ALB URL**.

---

## 🐳 Deploying the Docker Image

### 6️⃣ Authenticate Docker with AWS ECR

```sh
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.ap-south-1.amazonaws.com
```

### 7️⃣ Build and Push Docker Image

```sh
docker build -t satararestapi .
docker tag satararestapi:latest <aws_account_id>.dkr.ecr.ap-south-1.amazonaws.com/satararestapi:latest
docker push <aws_account_id>.dkr.ecr.ap-south-1.amazonaws.com/satararestapi:latest
```

### 8️⃣ Update ECS Service

```sh
aws ecs update-service --cluster restapi --service my-service --force-new-deployment
```

---

## 🌍 Access the Application

Once deployment is complete, you can access your API at:

```
http://<ALB_DNS_NAME>:3000
```

Check your Terraform output or AWS Console for the **ALB URL**.

---

## 🗑 Destroying the Infrastructure

To remove all AWS resources, run:

```sh
terraform destroy -auto-approve
```

This will delete the ECS cluster, ALB, security groups, IAM roles, and other associated resources.

---

## 📌 Notes

- Default **VPC**, **subnets**, and **security groups** are used.
- Ensure your **ECR repo** and **task definition** match.
- If the deployment fails, check logs using:
  ```sh
  aws ecs describe-tasks --cluster restapi --tasks <task-id>
  ```

---

## 📜 License

This project is **MIT Licensed**.

