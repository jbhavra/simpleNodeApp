pipeline{
    agent{
        docker{
            image 'node:latest'
        }
    }
    environment {
        HOME = '.'
    }

    stages{
        stage('Build'){
            steps{
                sh 'npm install'
            }
        }

        stage('Unit Test'){
            steps{
                sh 'npm test'
            }
        }

        stage('Sonar and Security'){
            environment {
                def scannerHome = tool 'SonarQube Scanner'
            } 
            steps{
                withSonarQubeEnv('SonarQubeServer'){
                    sh "ls ${scannerHome}"
                    sh "${scannerHome}/bin/sonar-scanner"
                }
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}