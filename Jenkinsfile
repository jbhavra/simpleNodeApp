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
                def scannerHome = tool 'SonarQube Scanner';
            } 
            steps{
                withSonarQubeEnv('SonarQubeServer'){
                    //sh "ls /var/jenkins_home/tools/hudson.plugins.sonar.SonarRunnerInstallation/"
                    //sh "${scannerHome}/bin/sonar-scanner"
                    sh 'mvn org.sonarsource.scanner.maven:sonar-maven-plugin:3.6.0.1398:sonar'
                }
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}