### Sample MERN (Mongodb, express, react and node) application to demonstrate user account creation and user sessions

### Prerequisites
#### Install dependencies
```
npm install
cd client && npm install
```

#### Setup database server
```
brew install mongodb
mkdir -p /data/db
sudo mkdir -p /data/db
mongod
```

Use `mongo` command to interactively start the shell and run `use turbo_db` to
create a new database with name `turbo_db`.

#### Configure web server
Create an environment file `.env` in the root directory and add the following
two entries
```
DB_URL='mongodb://localhost:27017/turbo_db'
JWT_SECRET=<your_json_webtoken_secret>
```

#### Start web server and react webpack server
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
