module.exports = {
	"*.{js,ts,tsx,md,json,css}": [ "prettier --write", "git add" ],
	"*.{js,ts,tsx}": [ "eslint . --cache --ext .js,.ts,.tsx" ]
};
