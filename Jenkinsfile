pipeline{
    agent{
        docker{
            image 'node:latest'
        }
    }
    environment {
                def scannerHome = tool 'SonarScanner';
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
            steps{
                withSonarQubeEnv('SonarQubeServer'){
                    sh """
                        cd /var/jenkins_home/tools/hudson.plugins.sonar.SonarRunnerInstallation/SonarScanner
                        ls -la
                    """
                    sh "${scannerHome}/bin/sonar-scanner"
                }
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}