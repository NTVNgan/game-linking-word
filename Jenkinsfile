// Copyright (C) 2023 Xebus.  All rights reserved.
//
// This software is the confidential and proprietary information of Xebus
// or one of its subsidiaries.  You shall not disclose this confidential
// information and shall use it only in accordance with the terms of the
// license agreement or other applicable agreement you entered into with 
// Xebus.
//
// XEBUS MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT THE SUITABILITY OF
// THE SOFTWARE, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
// THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
// PURPOSE, OR NON-INFRINGEMENT.  XEBUS SHALL NOT BE LIABLE FOR ANY 
// LOSSES OR DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING
// OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.

// @depends: [Docker Commons](https://plugins.jenkins.io/docker-commons/) 
//     provides the common shared functionality for various Docker 
//     related plugins.
//
// @depends: [Docker Pipeline](https://plugins.jenkins.io/docker-workflow/)
//     to build and use Docker containers from pipelines. 

pipeline {
    agent {
        label "linux && docker"
    }

    options {
        // Disallow concurrent executions of the pipeline.  This prevents
        // simultaneous building and deployment of the project.
        disableConcurrentBuilds()
    }

    environment {
        // The identifier of the registry account where our collection of
        // repositories are created in.
        //
        // References:
        // - Docker Hub account: https://hub.docker.com/u/xebus
        //   - Account username: `xebus`
        //   - Account email address: `dockerhub@xebus.io`
        DOCKER_REGISTRY_ID = 'xebus'

        // The name of the repository where the different versions of the Docker
        // image of our service are stored in.
        //
        // References:
        // - Docker Hub repository: https://hub.docker.com/repository/docker/xebus/xebus-web-admin-console/general
        DOCKER_REPOSITORY_NAME = 'xebus-web-admin-console'

        // The Jenkins credential ID that contains the Docker Hub access token
        // that allows publishing Docker images of the Xebus Admin Console web 
        // application.
        // 
        // References:
        // - Jenkins credential: https://jenkins.xebus.io/manage/credentials/store/system/domain/_/credential/dockerhub-xebus-access-token/
        // - Docker Hub access token: https://hub.docker.com/settings/security
        //   - Account username: `xebus`
        //   - Account email address: `dockerhub@xebus.io`
        JENKINS_DOCKER_HUB_CREDENTIAL_ID = 'dockerhub-xebus-access-token'
    }

    parameters {
        choice(
            choices: ['debug', 'prod'],
            description: 'Choose the target build type',
            name: 'TARGET_BUILD_TYPE'
        )
    }

    stages {
        stage('Setup') {
            steps {
                // Retrieve Git commit ID of the HEAD as the application version.
                //
                // @todo: The app version should be retrieved from the file 
                //     `package.json` for the production environment.
                script {
                    env.APP_VERSION = sh(
                        returnStdout: true,
                        script: 'git rev-parse --short HEAD'
                    ).trim()
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Define the name and tag of the Docker image to build in the `name:tag`
                    // format:
                    //
                    //     <repository-hostname>/<repository-name>:<tag-name>
                    env.DOCKER_IMAGE_NAME = "${env.DOCKER_REGISTRY_ID}/${env.DOCKER_REPOSITORY_NAME}"
                    env.DOCKER_IMAGE_TAG = "${env.TARGET_BUILD_TYPE}-${env.APP_VERSION}"
                }

                echo("Building the Docker image \"${env.DOCKER_IMAGE_NAME}:${env.DOCKER_IMAGE_TAG}\"...")

                // Build the Docker image.
                sh(
                    returnStdout: false,
                    script: """
                        docker image build \
                            --file ${env.WORKSPACE}/Dockerfile \
                            --platform=linux/amd64 \
                            --no-cache \
                            --tag ${env.DOCKER_IMAGE_NAME}:${env.DOCKER_IMAGE_TAG} \
                            .
                    """
                )

                // Create the tag `latest` that refers to source <tag-name>.
                sh(
                    returnStdout: false,
                    script: """
                        docker tag ${env.DOCKER_IMAGE_NAME}:${env.DOCKER_IMAGE_TAG} ${env.DOCKER_IMAGE_NAME}:${TARGET_BUILD_TYPE}-latest
                    """
                )
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Push the Docker image to its repository.
                    docker.withRegistry('', "${env.JENKINS_DOCKER_HUB_CREDENTIAL_ID}") {
                        sh("docker push ${env.DOCKER_IMAGE_NAME}:${env.DOCKER_IMAGE_TAG}")
                        sh("docker push ${env.DOCKER_IMAGE_NAME}:${TARGET_BUILD_TYPE}-latest")
                    }
                }
            }
        }
    }


    post {
        // Clean-up Jenkins workspace.
        always {
            echo("Cleaning up Jenkins workspace...")
            deleteDir()

            // Delete the `@tmp` and `@script` directories which get generated at
            // run-time.  Over time, this leads to Jenkins pipelines taking up disk
            // space across Jenkins slave nodes.
            //
            //
            // @note: The function deleteDir() only deletes the current directory
            //     not these generated directories.  A [Jenkins issue was opened](https://issues.jenkins.io/browse/JENKINS-41805)
            //     but this issue still remains with Jenkins 2.277.3.
            dir("${env.WORKSPACE}@tmp") {
                deleteDir()
            }

            dir("${env.WORKSPACE}@script") {
                deleteDir()
            }            
            
            // Deleting the Docker images that was created in the Jenkins node 
            // instance.
            sh("docker image rmi --force ${env.DOCKER_IMAGE_NAME}:${env.DOCKER_IMAGE_TAG}")
            sh("docker image rmi --force ${env.DOCKER_IMAGE_NAME}:${TARGET_BUILD_TYPE}-latest")
        }
    }
}
