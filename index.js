const app = require('./app');
const port = 5050;

app.listen(port, () => {
   console.log(`Server listening on Port:${port}`);
});
