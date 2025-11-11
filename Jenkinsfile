pipeline {
  agent any
  options { timestamps(); disableConcurrentBuilds(); timeout(time: 20, unit: 'MINUTES') }

  environment {
    // === 꼭 확인 ===
    APP_NAME         = "todo-web"      // k8s Deployment.metadata.name
    CONTAINER_NAME   = "web"           // Deployment spec.template.spec.containers[0].name
    NAMESPACE        = "todo"

    IMAGE_NAME       = "todo-app"      // minikube 도커에 빌드할 이미지 이름
    MINIKUBE_PROFILE = "minikube"
    KUBECONFIG       = "/var/lib/jenkins/.kube/config"
    MINIKUBE_HOME    = "/var/lib/jenkins/.minikube"
    PATH             = "/usr/local/bin:/usr/bin:/bin:${PATH}"
  }

  triggers {
    // GitHub Webhook을 이미 연결했다면 활성화
    githubPush()
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Vars') {
      steps {
        script {
          env.IMAGE_TAG = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
        }
        sh 'echo "Using image tag: ${IMAGE_TAG}"'
      }
    }

    stage('Use Minikube Docker daemon') {
      steps {
        sh '''
          set -eux
          eval $(minikube -p ${MINIKUBE_PROFILE} docker-env)
          docker version
        '''
      }
    }

    stage('Build Image') {
      steps {
        sh '''
          set -eux
          eval $(minikube -p ${MINIKUBE_PROFILE} docker-env)
          docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
          docker images | head -n 20
        '''
      }
    }

    stage('Apply Manifests & Rollout') {
      steps {
        sh '''
          set -eux
          # Namespace 먼저(있으면 유지)
          kubectl apply -f k8s/namespace.yaml

          # 나머지 리소스들
          kubectl apply -n ${NAMESPACE} -f k8s/configmap.yaml || true
          kubectl apply -n ${NAMESPACE} -f k8s/pvc.yaml || true
          kubectl apply -n ${NAMESPACE} -f k8s/deployment.yaml
          kubectl apply -n ${NAMESPACE} -f k8s/service.yaml

          # 이미지 교체 후 롤아웃 대기
          kubectl -n ${NAMESPACE} set image deploy/${APP_NAME} ${CONTAINER_NAME}=${IMAGE_NAME}:${IMAGE_TAG} --record=true
          kubectl -n ${NAMESPACE} rollout status deploy/${APP_NAME} --timeout=180s
        '''
      }
    }

    stage('Smoke check') {
      steps {
        sh '''
          set -eux

          # 방법 B: 직접 NodePort로 체크하고 싶으면 (주석 해제)
          MINI_IP=$(minikube -p ${MINIKUBE_PROFILE} ip)
          curl -fsS "http://$MINI_IP:30080/api/health" | tee /dev/stderr
        '''
      }
    }
  }

  post {
    failure {
      sh '''
        echo "---- describe deploy ----"
        kubectl -n ${NAMESPACE} describe deploy/${APP_NAME} || true
        echo "---- recent pod logs ----"
        kubectl -n ${NAMESPACE} logs -l app=${APP_NAME} --tail=200 || true
      '''
    }
  }
}
