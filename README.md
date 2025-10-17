# Prova Técnica - k8s

# 🧭 Prova Técnica – Vaga de Observability

## 🎯 Objetivo

Avaliar seus conhecimentos em **Kubernetes**, **desenvolvimento de software** e **boas práticas de observabilidade** e arquitetura de sistemas modernos.

---

## ⚙️ Requisitos Técnicos

- As nomenclaturas devem seguir um padrão consistente e claro.
- As configurações de rede e exposição de serviços devem ser seguras.
- O código deve seguir boas práticas de **Clean Code** e **Clean Architecture**.
- O código precisa ser salvo em um **repositório Git** (público ou privado com acesso concedido).

---

- Utilize **K3s**, **Kind**, **Minikube** ou **k3d** para provisionar um cluster Kubernetes local.
    
    ## 🧩 Parte 1: Back-End Node.js em Docker (Kubernetes Local)
    
- Crie um **Deployment** e um **Service** para o back-end desenvolvido em **Node.js**.
- O back-end deve rodar dentro de um **container Docker** com Dockerfile próprio.
- Configure o back-end para armazenar dados em um banco de dados **MySQL** ou **PostgreSQL**.
    - Pode ser um **Pod** separado ou um **container sidecar**.
    - Caso use volume persistente, utilize **PersistentVolumeClaim (PVC)**.

### 🔐 Regras e Segurança

- O back-end deve aceitar requisições apenas do front-end e de pods internos.
- O acesso externo (via `NodePort` ou `Ingress`) deve estar restrito apenas ao front-end.
- Utilize **Network Policies** se possível, para reforçar o isolamento.

---

## 💻 Parte 2: Front-End React (Static Hosting via Ingress + Nginx)

- Crie uma **imagem Docker** do front-end React (build de produção).
- Suba essa imagem em um **Pod** no cluster com **Nginx** servindo os arquivos estáticos.
- Crie um **Service** e um **Ingress** para expor o front-end localmente (por exemplo, em `http://localhost`).
- Garanta o roteamento adequado para **Single Page Application (SPA)**, redirecionando rotas para `/index.html`.
- Configure o front-end para consumir as APIs do back-end, utilizando o **service name** do Kubernetes.
- Corrija e teste as configurações de **CORS** para permitir a comunicação entre os pods.

---

## 📊 Parte 3: Instrumentação com OpenTelemetry

Implemente a instrumentação **automática** no back-end Node.js utilizando o **OpenTelemetry**:

- Capture **métricas** e **traces** de desempenho da aplicação.
- Configure o envio dos dados para:
    - O **console local**, para análise básica; ou
    - Um **OpenTelemetry Collector** rodando no mesmo cluster.

### Métricas e Traces obrigatórios:

- Tempo de resposta das APIs.
- Taxas de erro e sucesso das requisições.
- Nome e duração das operações (traces).

Se desejar, inclua logs estruturados também.

---

## 🧮 Critérios de Avaliação

### 🏗️ Apresentação do Projeto

- Clareza na explicação da arquitetura e decisões tomadas.
- Organização dos manifests Kubernetes e Dockerfiles.

### 📘 Documentação

- Passo a passo da implementação.
- Instruções para subir o ambiente localmente (`make`, `kubectl apply`, etc.).
- Explicação de como a solução atende aos requisitos e boas práticas.

### 🔎 Observabilidade

- Implementação funcional do OpenTelemetry.
- Evidências de métricas e traces funcionando (ex.: logs, screenshots ou exportações).

### 🔐 Segurança

- Configurações de rede, ingress e políticas de acesso corretas.
- Comunicação segura entre front-end e back-end.

### 🔄 Ciclo Completo

- Do provisionamento local ao funcionamento completo da aplicação.

---

## 📷 Instruções Finais

Inclua no repositório:

- **Capturas de tela** do sistema rodando e da instrumentação.
- **Logs** ou prints do terminal mostrando métricas/traces.
- **Manifests Kubernetes**, Dockerfiles e scripts utilizados.

Prepare-se para apresentar sua solução em uma sessão de até **1 hora**, explicando:

- Arquitetura adotada.
- Decisões de design e segurança.
- Como implementou a observabilidade e instrumentação.