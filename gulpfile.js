const { series, parallel } = require("gulp");

function fn1(cb) {
	console.log("fn1");
	cb();
}

function fn2(cb) {
	console.log("fn2");
	cb();
}

function fn3(cb) {
	console.log("fn3");
	cb();
}
exports.fn1 = fn1;
exports.foo = series(fn3, parallel(fn1, fn2));

function promiseTask() {
	return Promise.resolve(1); // return 只支持 Promise ｜ cb ｜ Observers ｜ child_process ｜ stream | await
}

exports._promise = promiseTask;
