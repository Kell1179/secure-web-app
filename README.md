Projek ini menggunakan NextJS, sehingga lakukan

npm install

**Catatan :**
1. Projek ini secara default merupakan simulasi dari Docker Compose
2. Untuk mensimulasikan Docker Stack/ Swarm lakukan langkah di bawah ini :
    a. redis_password.txt dipindah ke folder secret dan diubah menjadi redis_password saja
    b. Ubah docker-compose.yml menjadi seperti di bawah

services:
  redis:
    image: redis:7
    command: ["sh", "-c", "redis-server --requirepass $$(cat /run/secrets/redis_password)"]
    secrets:
      - source: redis_password
        target: redis_password
    ports:
      - "6379:6379"
    networks:
      - app-net
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

  web:
    image: my-app-image
    ports:
      - "3000:3000"
    secrets:
      - source: redis_password
        target: redis_password
    environment:
      - REDIS_PASSWORD_FILE=/run/secrets/redis_password
    networks:
      - app-net
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure

secrets:
  redis_password:
    external: true

networks:
  app-net:
    driver: overlay
