FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests


FROM openjdk:17-jdk-slim
COPY --from=build /simpledesk_backend.jar simpledesk_backend.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/simpledesk_backend.jar.jar"]