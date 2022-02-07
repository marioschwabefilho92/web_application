FROM postgres
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_USER=postgres
COPY ./auser.sh /docker-entrypoint-initdb.d/
COPY ./class.sql /docker-entrypoint-initdb.d/