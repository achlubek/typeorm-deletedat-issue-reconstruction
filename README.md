# TypeORM issue reconstruction
Looks like DeletedDateColumn messes with eager loading.

See the test for comparison.

### To run this project
You will need:
- Yarn
- Docker
- Free 3002 port

1. yarn install
2. yarn build
3. docker-compose up -d
4. yarn orm migration:run
5. yarn test
