pipeline{
    agent{
        docker{
            image 'node:latest'
        }
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
                scannerHome = tool 'SonarQubeScanner'
            } 
            steps{
                withSonarQubeEnv('SonarQube'){
                    sh "ls ${scannerHome}/bin"
                    sh "${scannerHome}/bin/sonar-scanner"
                }
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}