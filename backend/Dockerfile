FROM ubuntu:latest AS build
RUN apt-get update
RUN apt-get install openjdk-17-jdk -y
COPY . .

RUN mvn clean package -DshipTests

FROM openjdk:17-jdk-slim
EXPOSE 8080
COPY target/simpledesk_backend.jar simpledesk_backend.jar

ENTRYPOINT ["java", "-jar", "/simpledesk_backend.jar.jar"]