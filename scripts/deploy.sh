#!/bin/bash

# Aplica todos os recursos Kubernetes
kubectl apply -f ../k8s/namespace.yaml
kubectl apply -f ../k8s/secrets/db-secrets.yaml
kubectl apply -f ../k8s/persistent-volume-claims/postgres-pvc.yaml
kubectl apply -f ../k8s/deployments/postgres-deployment.yaml
kubectl apply -f ../k8s/services/postgres-service.yaml
kubectl apply -f ../k8s/deployments/back-end-deployment.yaml
kubectl apply -f ../k8s/services/back-end-service.yaml
kubectl apply -f ../k8s/deployments/front-end-deployment.yaml
kubectl apply -f ../k8s/services/front-end-service.yaml
kubectl apply -f ../k8s/ingress.yaml  # Se estiver usando Ingress

echo "Recursos Kubernetes aplicados com sucesso!"
