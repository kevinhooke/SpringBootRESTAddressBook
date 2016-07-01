# hypriot/rpi-java base image for arm compatible
FROM hypriot/rpi-java
ADD SpringBootREST-0.0.1-SNAPSHOT.jar /opt/SpringBootREST-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/opt/SpringBootREST-0.0.1-SNAPSHOT.jar"]