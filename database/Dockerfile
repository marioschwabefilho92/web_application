FROM postgres:14.1
ENV POSTGRES_USER=postgres
ENV DB_NAME=class
ENV DB_USER=docker
ENV SQL_FILE_PATH=/home/class.sql
COPY ./init.sh /docker-entrypoint-initdb.d/
COPY ./class.sql /home