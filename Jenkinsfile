pipeline {
    agent any
    environment {
        GITHUB_CRED = 'GitHub-Token'
        DOCKERHUB_CRED = 'DockerHub-Token'
        SONAR_CRED = 'SonarQube-Token'
        BACKEND_IMAGE = 'ahnaf4920/backend-v1.0'
        FRONTEND_IMAGE = 'ahnaf4920/frontend-v1.0'
    }
    stages {
        stage('Code Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ahnaf0731/DevOps.git',
                    credentialsId: "${GITHUB_CRED}"
            }
        }
        
        stage('Verify Tools') {
            steps {
                sh 'java -version'
                sh 'mvn -version'
                sh 'docker --version'
                sh 'ls -la'
            }
        }
        
        stage('Backend Build') {
            steps {
                dir('backend') {  
                    sh 'mvn clean compile || echo "Backend build failed - check if backend directory exists"'
                }
            }
        }
        
        stage('Frontend Check') {
            steps {
                dir('frontend') {  
                    sh 'ls -la && echo "Frontend directory found" || echo "No frontend directory"'
                }
            }
        }
        
        stage('Simple Docker Test') {
            steps {
                sh 'docker images || echo "Docker command failed"'
            }
        }
    }
    post {
        always {
            echo 'Pipeline execution completed!'
        }
    }
}
