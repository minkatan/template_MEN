package installed
1. express
2. dotenv
3. express-async-handler -- this is use to manage the promise return from mongoose


serverjs > routes > controller > middleware to manage error > connect to database > userModels > setup json webtoken for authentication > create route to protect users

things to update

1. url on server.js and routes
2. database uri in .env.


notes

1. to connect to the correct collection/database, update it on .env (example template_systems)