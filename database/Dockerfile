FROM postgres:14.1
ENV SQL_FILE_PATH=/home/class.sql
COPY ./init.sh /docker-entrypoint-initdb.d/
COPY ./class.sql /home