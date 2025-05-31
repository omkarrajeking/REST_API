pipeline {
agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                sshagent (credentials: ['git']) {
                    script {
                        // sh '''
                        //   mkdir -p ~/.ssh   1234567
                        //   ssh-keyscan github.com >> ~/.ssh/known_hosts
                        //     '''

                        def repoDir = 'REST_API'
                        if (fileExists(repoDir)) {
                            echo "Directory exists, pulling latest changes..."
                            dir(repoDir) {
                                sh 'git pull origin main'
                            }
                        } else {
                            echo "Directory does not exist, cloning..."
                            sh 'git clone git@github.com:omkarrajeking/REST_API.git'
                        }
                    }
                }
            }
        }

        stage('Login to ECR') {
            steps {
                script {
                    sh """
                       
                        aws ecr get-login-password --region ap-south-1 | \
                        docker login --username AWS --password-stdin 014498638559.dkr.ecr.ap-south-1.amazonaws.com

                        docker pull karan5599/nextjs:v4
                        docker tag karan5599/nextjs:v4 014498638559.dkr.ecr.ap-south-1.amazonaws.com/frontened-new:latest
                        docker push 014498638559.dkr.ecr.ap-south-1.amazonaws.com/frontened-new:latest
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh """
                        chmod 600 backend.pem
                        ssh -i "backend.pem" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ubuntu@ec2-13-201-64-70.ap-south-1.compute.amazonaws.com << 'EOF'
                            echo "Running containers:"
                            sudo docker ps
                            echo "Stopping all containers..."
                            sudo docker ps -q | xargs -r sudo docker stop || true
                            echo "Removing stopped containers..."
                            sudo docker ps -a -q | xargs -r sudo docker rm || true
                            echo "Logging into AWS ECR..."
                            aws ecr get-login-password --region ap-south-1 | sudo docker login --username AWS --password-stdin 014498638559.dkr.ecr.ap-south-1.amazonaws.com

                            echo "Pulling new image..."
                            sudo docker pull 014498638559.dkr.ecr.ap-south-1.amazonaws.com/frontened-new:latest

                            echo "Running new container..."
                            sudo docker run -d -p 3000:3000 014498638559.dkr.ecr.ap-south-1.amazonaws.com/frontened-new:latest

EOF
"""
}
}
}
}
}
