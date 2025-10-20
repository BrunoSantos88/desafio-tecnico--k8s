
- To install the latest minikube stable release on x86-64 Linux using binary download:

```shell
curl -LO https://github.com/kubernetes/minikube/releases/latest/download/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube && rm minikube-linux-amd64
```

From a terminal with administrator access (but not logged in as root), run:

```shell
minikube start
 "no meu caso"
```

minikube start --driver=podman --force --nodes=2
