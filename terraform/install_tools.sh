#!/bin/bash

sudo apt update -y

################################
# Install Docker
################################

sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

################################
# Install Terraform
################################

sudo apt install wget unzip -y

wget https://releases.hashicorp.com/terraform/1.5.7/terraform_1.5.7_linux_amd64.zip

unzip terraform_1.5.7_linux_amd64.zip

sudo mv terraform /usr/local/bin/

################################
# Install Jenkins
################################

sudo apt install openjdk-17-jdk -y

curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
/usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
/etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update

sudo apt install jenkins -y

sudo systemctl start jenkins
sudo systemctl enable jenkins

################################
# Install Kubernetes Tools
################################

sudo apt install apt-transport-https ca-certificates curl -y

curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | \
sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] \
https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | \
sudo tee /etc/apt/sources.list.d/kubernetes.list

sudo apt update

sudo apt install kubelet kubeadm kubectl -y

################################
# Install Helm
################################

curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

################################
# Install Grafana
################################

sudo apt install -y software-properties-common

wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -

echo "deb https://packages.grafana.com/oss/deb stable main" | \
sudo tee -a /etc/apt/sources.list.d/grafana.list

sudo apt update

sudo apt install grafana -y

sudo systemctl start grafana-server
sudo systemctl enable grafana-server