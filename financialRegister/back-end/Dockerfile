# syntax=docker/dockerfile:1
FROM python:3.7-slim
WORKDIR /app
COPY requirements.txt requirements.txt
RUN apt-get update -y
RUN apt-get install -y build-essential
RUN apt-get -y install default-libmysqlclient-dev 
RUN pip3 install -r requirements.txt
COPY . .
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]