module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true
	},
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parserOptions: {
		ecmaVersion: 2018
	},
	rules: {
		indent: ["error", 2],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		"no-empty": "warn",
		"no-cond-assign": ["error", "always"]
	}
};
