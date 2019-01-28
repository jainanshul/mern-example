### Prerequisites
#### Install dependencies
```
npm run install
cd client && npm run install
```

#### Setup database server
```
brew install mongodb
mkdir -p /data/db
sudo mkdir -p /data/db
```

Start the database server by running command `mongod`. Use `mongo` command to interactively start the shell and run `use turbo_db` to create a new database with name `turbo_db`.

#### Start webserver
```
npm run dev
```

#### Lint code
```
npm run lint
```

#### Run unit tests
```
npm run test
```
