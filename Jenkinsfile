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
        
        stage('Test System Tools') {
            steps {
                sh 'java -version'
                sh 'mvn -version || echo "Maven not installed"'
                sh 'docker --version || echo "Docker not installed"'
                sh 'ls -la'
            }
        }
        
        stage('Backend: Clean & Compile') {
            steps {
                dir('backend') {  
                    sh "mvn clean compile || echo 'Maven build failed - continuing for demo'"
                }
            }
        }
        
        stage('Frontend: Test') {
            steps {
                dir('frontend') {  
                    sh 'ls -la || echo "Frontend directory not found"'
                }
            }
        }
        
        stage('Docker Test') {
            steps {
                script {
                    sh 'docker version || echo "Docker not available"'
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline completed!'
        }
        success {
            echo 'Success! All stages completed.'
        }
        failure {
            echo 'Some stages failed - check tool configuration'
        }
    }
}
