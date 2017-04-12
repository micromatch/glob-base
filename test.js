/*!
 * glob-base <https://github.com/jonschlinkert/glob-base>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha */
var should = require('should');
var globBase = require('./');

describe('glob-base:', function () {
  it('typical globs:', function () {
    globBase('!foo').should.eql({ base: '.', isGlob: true, glob: '!foo' });
    globBase('*').should.eql({ base: '.', isGlob: true, glob: '*' });
    globBase('**').should.eql({ base: '.', isGlob: true, glob: '**' });
    globBase('**/*.md').should.eql({ base: '.', isGlob: true, glob: '**/*.md' });
    globBase('**/*.min.js').should.eql({ base: '.', isGlob: true, glob: '**/*.min.js' });
    globBase('**/*foo.js').should.eql({ base: '.', isGlob: true, glob: '**/*foo.js' });
    globBase('**/.*').should.eql({ base: '.', isGlob: true, glob: '**/.*' });
    globBase('**/d').should.eql({ base: '.', isGlob: true, glob: '**/d' });
    globBase('*.*').should.eql({ base: '.', isGlob: true, glob: '*.*' });
    globBase('*.js').should.eql({ base: '.', isGlob: true, glob: '*.js' });
    globBase('*.md').should.eql({ base: '.', isGlob: true, glob: '*.md' });
    globBase('*.min.js').should.eql({ base: '.', isGlob: true, glob: '*.min.js' });
    globBase('*/*').should.eql({ base: '.', isGlob: true, glob: '*/*' });
    globBase('*/*/*/*').should.eql({ base: '.', isGlob: true, glob: '*/*/*/*' });
    globBase('*/*/*/e').should.eql({ base: '.', isGlob: true, glob: '*/*/*/e' });
    globBase('*/b/*/e').should.eql({ base: '.', isGlob: true, glob: '*/b/*/e' });
    globBase('*b').should.eql({ base: '.', isGlob: true, glob: '*b' });
    globBase('.*').should.eql({ base: '.', isGlob: true, glob: '.*' });
    globBase('./*').should.eql({ base: '.', isGlob: true, glob: '*' });
    globBase('./a/**/j/**/z/*.md').should.eql({ base: './a', isGlob: true, glob: '**/j/**/z/*.md' });
    globBase('./a/**/z/*.md').should.eql({ base: './a', isGlob: true, glob: '**/z/*.md' });
    globBase('./node_modules/*-glob/**/*.js').should.eql({ base: './node_modules', isGlob: true, glob: '*-glob/**/*.js' });
    globBase('./{a/b/{c,/foo.js}/e.f.g}').should.eql({ base: '.', isGlob: true, glob: '{a/b/{c,/foo.js}/e.f.g}' });
    globBase('.a*').should.eql({ base: '.', isGlob: true, glob: '.a*' });
    globBase('.b*').should.eql({ base: '.', isGlob: true, glob: '.b*' });
    globBase('/*').should.eql({ base: '/', isGlob: true, glob: '*' });
    globBase('a/***').should.eql({ base: 'a', isGlob: true, glob: '***' });
    globBase('a/**/b/*.{foo,bar}').should.eql({ base: 'a', isGlob: true, glob: '**/b/*.{foo,bar}' });
    globBase('a/**/c/*').should.eql({ base: 'a', isGlob: true, glob: '**/c/*' });
    globBase('a/**/c/*.md').should.eql({ base: 'a', isGlob: true, glob: '**/c/*.md' });
    globBase('a/**/e').should.eql({ base: 'a', isGlob: true, glob: '**/e' });
    globBase('a/**/j/**/z/*.md').should.eql({ base: 'a', isGlob: true, glob: '**/j/**/z/*.md' });
    globBase('a/**/z/*.md').should.eql({ base: 'a', isGlob: true, glob: '**/z/*.md' });
    globBase('a/**c*').should.eql({ base: 'a', isGlob: true, glob: '**c*' });
    globBase('a/**c/*').should.eql({ base: 'a', isGlob: true, glob: '**c/*' });
    globBase('a/*/*/e').should.eql({ base: 'a', isGlob: true, glob: '*/*/e' });
    globBase('a/*/c/*.md').should.eql({ base: 'a', isGlob: true, glob: '*/c/*.md' });
    globBase('a/b/**/c{d,e}/**/xyz.md').should.eql({ base: 'a/b', isGlob: true, glob: '**/c{d,e}/**/xyz.md' });
    globBase('a/b/**/e').should.eql({ base: 'a/b', isGlob: true, glob: '**/e' });
    globBase('a/b/*.{foo,bar}').should.eql({ base: 'a/b', isGlob: true, glob: '*.{foo,bar}' });
    globBase('a/b/*/e').should.eql({ base: 'a/b', isGlob: true, glob: '*/e' });
    globBase('a/b/.git/').should.eql({ base: 'a/b/.git/', isGlob: false, glob: '' });
    globBase('a/b/.git/**').should.eql({ base: 'a/b/.git', isGlob: true, glob: '**' });
    globBase('a/b/.{foo,bar}').should.eql({ base: 'a/b', isGlob: true, glob: '.{foo,bar}' });
    globBase('a/b/c/*').should.eql({ base: 'a/b/c', isGlob: true, glob: '*' });
    globBase('a/b/c/**/*.min.js').should.eql({ base: 'a/b/c', isGlob: true, glob: '**/*.min.js' });
    globBase('a/b/c/*.md').should.eql({ base: 'a/b/c', isGlob: true, glob: '*.md' });
    globBase('a/b/c/.*.md').should.eql({ base: 'a/b/c', isGlob: true, glob: '.*.md' });
    globBase('a/b/{c,.gitignore,{a,b}}/{a,b}/abc.foo.js').should.eql({ base: 'a/b', isGlob: true, glob: '{c,.gitignore,{a,b}}/{a,b}/abc.foo.js' });
    globBase('a/b/{c,/.gitignore}').should.eql({ base: 'a/b', isGlob: true, glob: '{c,/.gitignore}' });
    globBase('a/b/{c,d}/').should.eql({ base: 'a/b', isGlob: true, glob: '{c,d}/' });
    globBase('a/b/{c,d}/e/f.g').should.eql({ base: 'a/b', isGlob: true, glob: '{c,d}/e/f.g' });
    globBase('b/*/*/*').should.eql({ base: 'b', isGlob: true, glob: '*/*/*' });
  });
  it('file extensions:', function () {
    globBase('.md').should.eql({ base: '.', isGlob: false, glob: '.md' });
  });
  it('negation pattern:', function () {
    globBase('!*.min.js').should.eql({ base: '.', isGlob: true, glob: '!*.min.js' });
    globBase('!foo').should.eql({ base: '.', isGlob: true, glob: '!foo' });
    globBase('a/b/c/!(foo)').should.eql({ base: 'a/b/c', isGlob: true, glob: '!(foo)' });
    globBase('!foo/(a|b).min.js').should.eql({ base: '.', isGlob: true, glob: '!foo/(a|b).min.js' });
    globBase('!foo/[a-b].min.js').should.eql({ base: '.', isGlob: true, glob: '!foo/[a-b].min.js' });
    globBase('!foo/{a,b}.min.js').should.eql({ base: '.', isGlob: true, glob: '!foo/{a,b}.min.js' });
  });
  it('extglobs:', function () {
    globBase('/a/b/!(a|b)/e.f.g/').should.eql({ base: '/a/b', isGlob: true, glob: '!(a|b)/e.f.g/' });
    globBase('/a/b/@(a|b)/e.f.g/').should.eql({ base: '/a/b', isGlob: true, glob: '@(a|b)/e.f.g/' });
    globBase('@(a|b)/e.f.g/').should.eql({ base: '.', isGlob: true, glob: '@(a|b)/e.f.g/' });
  });
  it('braces: no base:', function () {
    globBase('/a/b/{c,/foo.js}/e.f.g/').should.eql({ base: '/a/b', isGlob: true, glob: '{c,/foo.js}/e.f.g/' });
    globBase('{a/b/c.js,/a/b/{c,/foo.js}/e.f.g/}').should.eql({ base: '.', isGlob: true, glob: '{a/b/c.js,/a/b/{c,/foo.js}/e.f.g/}' });
    globBase('/a/b/{c,d}/').should.eql({ base: '/a/b', isGlob: true, glob: '{c,d}/' });
    globBase('/a/b/{c,d}/*.js').should.eql({ base: '/a/b', isGlob: true, glob: '{c,d}/*.js' });
    globBase('/a/b/{c,d}/*.min.js').should.eql({ base: '/a/b', isGlob: true, glob: '{c,d}/*.min.js' });
    globBase('/a/b/{c,d}/e.f.g/').should.eql({ base: '/a/b', isGlob: true, glob: '{c,d}/e.f.g/' });
    globBase('{.,*}').should.eql({ base: '.', isGlob: true, glob: '{.,*}' });
  });
  it('braces in filename:', function () {
    globBase('a/b/.{c,.gitignore}').should.eql({ base: 'a/b', isGlob: true, glob: '.{c,.gitignore}' });
    globBase('a/b/.{c,/.gitignore}').should.eql({ base: 'a/b', isGlob: true, glob: '.{c,/.gitignore}' });
    globBase('a/b/.{foo,bar}').should.eql({ base: 'a/b', isGlob: true, glob: '.{foo,bar}' });
    globBase('a/b/{c,.gitignore}').should.eql({ base: 'a/b', isGlob: true, glob: '{c,.gitignore}' });
    globBase('a/b/{c,/.gitignore}').should.eql({ base: 'a/b', isGlob: true, glob: '{c,/.gitignore}' });
    globBase('a/b/{c,/gitignore}').should.eql({ base: 'a/b', isGlob: true, glob: '{c,/gitignore}' });
    globBase('a/b/{c,d}').should.eql({ base: 'a/b', isGlob: true, glob: '{c,d}' });
  });
  it('braces in dirname:', function () {
    globBase('a/b/{c,./d}/e/f.g').should.eql({ base: 'a/b', isGlob: true, glob: '{c,./d}/e/f.g' });
    globBase('a/b/{c,./d}/e/f.min.g').should.eql({ base: 'a/b', isGlob: true, glob: '{c,./d}/e/f.min.g' });
    globBase('a/b/{c,.gitignore,{a,./b}}/{a,b}/abc.foo.js').should.eql({ base: 'a/b', isGlob: true, glob: '{c,.gitignore,{a,./b}}/{a,b}/abc.foo.js' });
    globBase('a/b/{c,.gitignore,{a,b}}/{a,b}/*.foo.js').should.eql({ base: 'a/b', isGlob: true, glob: '{c,.gitignore,{a,b}}/{a,b}/*.foo.js' });
    globBase('a/b/{c,.gitignore,{a,b}}/{a,b}/abc.foo.js').should.eql({ base: 'a/b', isGlob: true, glob: '{c,.gitignore,{a,b}}/{a,b}/abc.foo.js' });
    globBase('a/b/{c,/d}/e/f.g').should.eql({ base: 'a/b', isGlob: true, glob: '{c,/d}/e/f.g' });
    globBase('a/b/{c,/d}/e/f.min.g').should.eql({ base: 'a/b', isGlob: true, glob: '{c,/d}/e/f.min.g' });
    globBase('a/b/{c,d}/').should.eql({ base: 'a/b', isGlob: true, glob: '{c,d}/' });
    globBase('a/b/{c,d}/*.js').should.eql({ base: 'a/b', isGlob: true, glob: '{c,d}/*.js' });
    globBase('a/b/{c,d}/*.min.js').should.eql({ base: 'a/b', isGlob: true, glob: '{c,d}/*.min.js' });
    globBase('a/b/{c,d}/e.f.g/').should.eql({ base: 'a/b', isGlob: true, glob: '{c,d}/e.f.g/' });
    globBase('a/b/{c,d}/e/f.g').should.eql({ base: 'a/b', isGlob: true, glob: '{c,d}/e/f.g' });
    globBase('a/b/{c,d}/e/f.min.g').should.eql({ base: 'a/b', isGlob: true, glob: '{c,d}/e/f.min.g' });
    globBase('foo/{a,b}.min.js').should.eql({ base: 'foo', isGlob: true, glob: '{a,b}.min.js' });
  });
  it('regex character classes:', function () {
    globBase('[a-c]b*').should.eql({ base: '.', isGlob: true, glob: '[a-c]b*' });
    globBase('[a-j]*[^c]').should.eql({ base: '.', isGlob: true, glob: '[a-j]*[^c]' });
    globBase('[a-j]*[^c]b/c').should.eql({ base: '.', isGlob: true, glob: '[a-j]*[^c]b/c' });
    globBase('[a-j]*[^c]bc').should.eql({ base: '.', isGlob: true, glob: '[a-j]*[^c]bc' });
    globBase('[ab][ab]').should.eql({ base: '.', isGlob: true, glob: '[ab][ab]' });
    globBase('foo/[a-b].min.js').should.eql({ base: 'foo', isGlob: true, glob: '[a-b].min.js' });
  });
  it('qmarks:', function () {
    globBase('?').should.eql({ base: '.', isGlob: true, glob: '?' });
    globBase('?/?').should.eql({ base: '.', isGlob: true, glob: '?/?' });
    globBase('??').should.eql({ base: '.', isGlob: true, glob: '??' });
    globBase('???').should.eql({ base: '.', isGlob: true, glob: '???' });
    globBase('?a').should.eql({ base: '.', isGlob: true, glob: '?a' });
    globBase('?b').should.eql({ base: '.', isGlob: true, glob: '?b' });
    globBase('a?b').should.eql({ base: '.', isGlob: true, glob: 'a?b' });
    globBase('a/?/c.js').should.eql({ base: 'a', isGlob: true, glob: '?/c.js' });
    globBase('a/?/c.md').should.eql({ base: 'a', isGlob: true, glob: '?/c.md' });
    globBase('a/?/c/?/*/f.js').should.eql({ base: 'a', isGlob: true, glob: '?/c/?/*/f.js' });
    globBase('a/?/c/?/*/f.md').should.eql({ base: 'a', isGlob: true, glob: '?/c/?/*/f.md' });
    globBase('a/?/c/?/e.js').should.eql({ base: 'a', isGlob: true, glob: '?/c/?/e.js' });
    globBase('a/?/c/?/e.md').should.eql({ base: 'a', isGlob: true, glob: '?/c/?/e.md' });
    globBase('a/?/c/???/e.js').should.eql({ base: 'a', isGlob: true, glob: '?/c/???/e.js' });
    globBase('a/?/c/???/e.md').should.eql({ base: 'a', isGlob: true, glob: '?/c/???/e.md' });
    globBase('a/??/c.js').should.eql({ base: 'a', isGlob: true, glob: '??/c.js' });
    globBase('a/??/c.md').should.eql({ base: 'a', isGlob: true, glob: '??/c.md' });
    globBase('a/???/c.js').should.eql({ base: 'a', isGlob: true, glob: '???/c.js' });
    globBase('a/???/c.md').should.eql({ base: 'a', isGlob: true, glob: '???/c.md' });
    globBase('a/????/c.js').should.eql({ base: 'a', isGlob: true, glob: '????/c.js' });
  });
  it('non-glob pattern:', function () {
    globBase('').should.eql({ base: '.', isGlob: false, glob: '' });
    globBase('.').should.eql({ base: '.', isGlob: false, glob: '.' });
    globBase('a').should.eql({ base: '.', isGlob: false, glob: 'a' });
    globBase('.a').should.eql({ base: '.', isGlob: false, glob: '.a' });
    globBase('/a').should.eql({ base: '/', isGlob: false, glob: 'a' });
    globBase('a/').should.eql({ base: 'a/', isGlob: false, glob: '' });
    globBase('/a/').should.eql({ base: '/a/', isGlob: false, glob: '' });
    globBase('/a/b/c').should.eql({ base: '/a/b', isGlob: false, glob: 'c' });
    globBase('/a/b/c/').should.eql({ base: '/a/b/c/', isGlob: false, glob: '' });
    globBase('a/b/c/').should.eql({ base: 'a/b/c/', isGlob: false, glob: '' });
    globBase('a.min.js').should.eql({ base: '.', isGlob: false, glob: 'a.min.js' });
    globBase('a/.x.md').should.eql({ base: 'a', isGlob: false, glob: '.x.md' });
    globBase('a/b/.gitignore').should.eql({ base: 'a/b', isGlob: false, glob: '.gitignore' });
    globBase('a/b/c/d.md').should.eql({ base: 'a/b/c', isGlob: false, glob: 'd.md' });
    globBase('a/b/c/d.e.f/g.min.js').should.eql({ base: 'a/b/c/d.e.f', isGlob: false, glob: 'g.min.js' });
    globBase('a/b/.git').should.eql({ base: 'a/b', isGlob: false, glob: '.git' });
    globBase('a/b/.git/').should.eql({ base: 'a/b/.git/', isGlob: false, glob: '' });
    globBase('a/b/c').should.eql({ base: 'a/b', isGlob: false, glob: 'c' });
    globBase('a/b/c.d/e.md').should.eql({ base: 'a/b/c.d', isGlob: false, glob: 'e.md' });
    globBase('a/b/c.md').should.eql({ base: 'a/b', isGlob: false, glob: 'c.md' });
    globBase('a/b/c.min.js').should.eql({ base: 'a/b', isGlob: false, glob: 'c.min.js' });
    globBase('a/b/git/').should.eql({ base: 'a/b/git/', isGlob: false, glob: '' });
    globBase('aa').should.eql({ base: '.', isGlob: false, glob: 'aa' });
    globBase('ab').should.eql({ base: '.', isGlob: false, glob: 'ab' });
    globBase('bb').should.eql({ base: '.', isGlob: false, glob: 'bb' });
    globBase('c.md').should.eql({ base: '.', isGlob: false, glob: 'c.md' });
    globBase('foo').should.eql({ base: '.', isGlob: false, glob: 'foo' });
  });
});
