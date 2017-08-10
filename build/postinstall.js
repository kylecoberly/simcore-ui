require('dotenv').config();
var shell = require('shelljs');

// Run external tool synchronously
if (shell.exec('bash post-install.sh').code !== 0) {
  shell.echo('Error: Post install failed');
  shell.exit(1);
}else {
  shell.echo('Good to go.');
}
