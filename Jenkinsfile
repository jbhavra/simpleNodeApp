pipeline{
    agent any
    tools {nodejs "nodeJs"}
    environment {
                def scannerHome = tool 'SonarScanner';
                HOME = '.'
            }

    stages{
        stage('Build'){
            steps{
                sh 'yarn install'
            }
        }

        stage('Unit Test'){
            steps{
                sh 'npm test'
            }
        }

        stage('Sonar Scan'){
            steps{
                withSonarQubeEnv('SonarQubeServer'){
                    sh "${scannerHome}/bin/sonar-scanner"
                }
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Security'){
            steps{
                snykSecurity organisation: 'jbhavra', projectName: 'simpleNodeApp', severity: 'medium', snykInstallation: 'SnykSecurityPlugin', snykTokenId: 'SnykAPIToken'
            }
        }

        stage('Stage Deployment check'){
            steps{
                input message: 'Proceed for stage deployment?'
            }
        }

        stage('Deployment to Staging'){
            steps{
                echo 'staging area deployment'
            }
        }

        stage('Promote to Production'){
            steps{
                input message: 'Proceed for production deployment?'
            }
        }

        stage('Deployment to Production'){
            steps{
                echo 'production deployment'
            }
        }
    }
}