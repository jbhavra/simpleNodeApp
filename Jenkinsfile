pipeline{
    agent any
    environment {
                def scannerHome = tool 'SonarScanner';
                HOME = '.'
            }

    stages{
        stage('Build'){
            agent{
                docker{
                    image 'node:latest'
                }
            }
            steps{
                sh 'npm install'
            }
        }

        stage('Unit Test'){
            agent{
                docker{
                    image 'node:latest'
                }
            }
            steps{
                sh 'npm test'
            }
        }

        stage('Sonar and Security'){
            steps{
                withSonarQubeEnv('SonarQubeServer'){
                    sh "${scannerHome}/bin/sonar-scanner"
                }
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}