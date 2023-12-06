# syntax=docker/dockerfile:1.4

FROM --platform=$BUILDPLATFORM maven:3.8.5-eclipse-temurin-17 AS builder
#BUILDPLATFORM — matches the current machine. (fx. linux/amd64, linux/arm64 or darwin/amd64)
WORKDIR /workdir/server
COPY pom.xml /workdir/server/pom.xml
RUN mvn dependency:go-offline

COPY src /workdir/server/src
RUN mvn install

FROM builder as dev-envs
# <<EOF: is a 'Heredoc'. EOF is the delimeter
RUN <<EOF
apt-get update # The indexes of available packages are fetched from the location(s) specified in /etc/apt/sources.list(5). An update should always be performed before an upgrade or dist-upgrade.
apt-get install -y git # Installs Git
EOF
# apt = linux package manager.
# apt-get = is the command-line tool for handling packages, and may be considered the user's "back-end" to other tools using the APT library. Several "front-end" interfaces exist, such as synaptic and aptitude.

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD ["mvn", "spring-boot:run"]

FROM builder as prepare-production
RUN mkdir -p target/dependency
WORKDIR /workdir/server/target/dependency
RUN jar -xf ../*.jar

FROM eclipse-temurin:17-jre-focal

EXPOSE 8080
VOLUME /tmp
ARG DEPENDENCY=/workdir/server/target/dependency
COPY --from=prepare-production ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=prepare-production ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=prepare-production ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","dev.trip.tutorreportbackend.Application"]