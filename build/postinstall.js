require('dotenv').config();
var shell = require('shelljs');

var isIntegration = process.env.INTEGRATION;
console.log(isIntegration);
console.log(process.env);

if (isIntegration && isIntegration === 'true') {
  if (shell.exec('bash post-install.sh').code !== 0) {
    shell.echo('Error: Post install failed');
    shell.exit(1);
  }else {
    shell.echo('Good to go.');
  }
}
