FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DshipTests

FROM amazoncorretto:17
COPY target/simpledesk_backend.jar simpledesk_backend.jar
ENTRYPOINT ["java", "-jar", "/simpledesk_backend.jar.jar"]