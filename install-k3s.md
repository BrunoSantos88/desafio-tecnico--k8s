# It is recommended to turn off ufw (uncomplicated firewall):

- ufw disable

- If you wish to keep ufw enabled, by default, the following rules are required:

```shell
ufw allow 6443/tcp
ufw allow from 10.42.0.0/16 to any 
ufw allow from 10.43.0.0/16 to any
```

- Additional ports may need to be opened depending on your setup. See Inbound Rules for more information. If you change the default CIDR for pods or services, you will need to update the firewall rules accordingly.

Server	2 cores	2 GB
Agent	1 core	512 MB
Resource Profiling captures the results of tests and analysis to determine minimum resource requirements for the K3s agent, the K3s server with a workload, and the K3s server with one agent.

Disks
K3s performance depends on the performance of the database. To ensure optimal speed, we recommend using an SSD when possible.



# Configuration with binary

```shell
sudo curl -Lo /usr/local/bin/k3s https://github.com/k3s-io/k3s/releases/download/v1.26.5+k3s1/k3s; chmod a+x /usr/local/bin/k3s
sudo K3S_KUBECONFIG_MODE="644" k3s server
sudo k3s server --write-kubeconfig-mode=644
sudo k3s agent --server https://k3s.example.com --token mypassword
```

LInk: https://docs.k3s.io/installation/configuration