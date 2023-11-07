mvn clean install -Dmaven.test.skip=true
docker build -t codelab-rapport .
docker run --name codelab-rapport -p 8080:8080 --rm codelab-rapport