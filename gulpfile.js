const { watch } = require("gulp");

watch('src/*.js',{delay: 300,ignoreInitial: false}, function(cb) {
	console.log('gulp watching...')
	cb()
})