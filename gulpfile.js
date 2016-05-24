'use strict';

const gulp = require('gulp');

const buildSemantic = require('./public/thirdparty/semantic/tasks/build');

gulp.task('build', buildSemantic);
gulp.task('default', ['build']);
