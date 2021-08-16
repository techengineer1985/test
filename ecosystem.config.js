"use strict";

/********************************

  // pm2 for deployment <CI/CD> solution

********************************/

const Pkg = require("./package.json");

module.exports = {
	apps: [
		{
			name: Pkg.name,
			max_memory_restart: "512M",
			exec_mode: "fork",
			script: "./index.js",
			env_production: {
				NODE_ENV: "production"
			}
		}
	],
	deploy: {
		production: {
			ssh_options: ["PasswordAuthentication=no"],
			user: "root",
			host: [""],
			ref: "origin/master",
			repo: "",
			path: "",
			"pre-deploy-local": "git push -u origin master",
			"post-deploy": `npm ci && npm audit fix && pm2 reload ${Pkg.name}`
		},
		dev: {
			ssh_options: ["PasswordAuthentication=no"],
			user: "root",
			host: [""],
			ref: "origin/master",
			repo: "",
			path: "",
			"pre-deploy-local": "git push -u origin master",
			"post-deploy": `npm ci && npm audit fix && pm2 reload ${Pkg.name}`
		}
	}
};
