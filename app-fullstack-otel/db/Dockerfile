# Dockerfile.postgres
FROM postgres:15
COPY init.sql /docker-entrypoint-initdb.d/01-calor.sql
ENV POSTGRES_DB=db
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
EXPOSE 5432