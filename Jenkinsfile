pipeline{
    agent any
    //tools {nodejs "NodeJs"}
    environment {
                def scannerHome = tool 'SonarScanner';
            }

    stages{
        stage('Build'){
            steps{
                sh "apk add nodejs"
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
                   /* sh """
                        cd /var/jenkins_home/tools/hudson.plugins.sonar.SonarRunnerInstallation/SonarScanner
                        ls -la
                    """ */
                    sh "${scannerHome}/sonar-scanner-cli-4.2.0.1873-linux/bin/sonar-scanner"
                }
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}