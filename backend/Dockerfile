FROM ubuntu:latest AS build
RUN apt-get update
RUN apt-get install openjdk-17-jdk -y
RUN apt-get install maven
RUN mvn clean package -DshipTests
COPY . .


FROM openjdk:17-jdk-slim
COPY --from=build /simpledesk_backend.jar simpledesk_backend.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/simpledesk_backend.jar.jar"]