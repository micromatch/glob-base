/*!
 * glob-base <https://github.com/jonschlinkert/glob-base>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('assert');
var globBase = require('./');

describe('should get a base path:', function () {
  it('should extract a base path from a glob pattern:', function () {
    assert.equal(globBase('.*').base, '.');
    assert.equal(globBase('.*').pattern, '.*');

    assert.equal(globBase('./*').base, '.');
    assert.equal(globBase('./*').pattern, '*');

    assert.equal(globBase('*').base, '.');
    assert.equal(globBase('*').pattern, '*');

    assert.equal(globBase('**').base, '.');
    assert.equal(globBase('**').pattern, '**');

    assert.equal(globBase('!foo').base, '.');
    assert.equal(globBase('!foo').pattern, '!foo');

    assert.equal(globBase('**/*.md').base, '.');
    assert.equal(globBase('**/*.md').pattern, '**/*.md');

    assert.equal(globBase('a/b/c/**/*.min.js').base, 'a/b/c');
    assert.equal(globBase('a/b/c/**/*.min.js').pattern, '**/*.min.js');

    assert.equal(globBase('**/*.min.js').base, '.');
    assert.equal(globBase('**/*.min.js').pattern, '**/*.min.js');

    assert.equal(globBase('**/*foo.js').base, '.');
    assert.equal(globBase('**/*foo.js').pattern, '**/*foo.js');

    assert.equal(globBase('**/.*').base, '.');
    assert.equal(globBase('**/.*').pattern, '**/.*');

    assert.equal(globBase('**/d').base, '.');
    assert.equal(globBase('**/d').pattern, '**/d');

    assert.equal(globBase('*.*').base, '.');
    assert.equal(globBase('*.*').pattern, '*.*');

    assert.equal(globBase('*.js').base, '.');
    assert.equal(globBase('*.js').pattern, '*.js');

    assert.equal(globBase('*.md').base, '.');
    assert.equal(globBase('*.md').pattern, '*.md');

    assert.equal(globBase('*.min.js').base, '.');
    assert.equal(globBase('*.min.js').pattern, '*.min.js');

    assert.equal(globBase('*/*').base, '.');
    assert.equal(globBase('*/*').pattern, '*/*');

    assert.equal(globBase('*/*/*/*').base, '.');
    assert.equal(globBase('*/*/*/*').pattern, '*/*/*/*');

    assert.equal(globBase('*/*/*/e').base, '.');
    assert.equal(globBase('*/*/*/e').pattern, '*/*/*/e');

    assert.equal(globBase('*/b/*/e').base, '.');
    assert.equal(globBase('*/b/*/e').pattern, '*/b/*/e');

    assert.equal(globBase('*b').base, '.');
    assert.equal(globBase('*b').pattern, '*b');

    assert.equal(globBase('./a/**/j/**/z/*.md').base, './a');
    assert.equal(globBase('./a/**/j/**/z/*.md').pattern, '**/j/**/z/*.md');

    assert.equal(globBase('./a/**/z/*.md').base, './a');
    assert.equal(globBase('./a/**/z/*.md').pattern, '**/z/*.md');

    assert.equal(globBase('./{a/b/{c,/foo.js}/e.f.g}').base, '.');
    assert.equal(globBase('./{a/b/{c,/foo.js}/e.f.g}').pattern, '{a/b/{c,/foo.js}/e.f.g}');

    assert.equal(globBase('./node_modules/*-glob/**/*.js').base, './node_modules');
    assert.equal(globBase('./node_modules/*-glob/**/*.js').pattern, '*-glob/**/*.js');

    assert.equal(globBase('a/b/{c,/.gitignore}').base, 'a/b');
    assert.equal(globBase('a/b/{c,/.gitignore}').pattern, '{c,/.gitignore}');

    assert.equal(globBase('a/b/.{foo,bar}').base, 'a/b');
    assert.equal(globBase('a/b/.{foo,bar}').pattern, '.{foo,bar}');

    assert.equal(globBase('a/b/*.{foo,bar}').base, 'a/b');
    assert.equal(globBase('a/b/*.{foo,bar}').pattern, '*.{foo,bar}');

    assert.equal(globBase('a/**/b/*.{foo,bar}').base, 'a');
    assert.equal(globBase('a/**/b/*.{foo,bar}').pattern, '**/b/*.{foo,bar}');

    assert.equal(globBase('a/b/{c,.gitignore,{a,b}}/{a,b}/abc.foo.js').base, 'a/b');
    assert.equal(globBase('a/b/{c,.gitignore,{a,b}}/{a,b}/abc.foo.js').pattern, '{c,.gitignore,{a,b}}/{a,b}/abc.foo.js');

    assert.equal(globBase('a/b/{c,d}/').base, 'a/b');
    assert.equal(globBase('a/b/{c,d}/').pattern, '{c,d}/');

    assert.equal(globBase('a/b/{c,d}/e/f.g').base, 'a/b');
    assert.equal(globBase('a/b/{c,d}/e/f.g').pattern, '{c,d}/e/f.g');

    assert.equal(globBase('.a*').base, '.');
    assert.equal(globBase('.a*').pattern, '.a*');

    assert.equal(globBase('.b*').base, '.');
    assert.equal(globBase('.b*').pattern, '.b*');

    assert.equal(globBase('/*').base, '/');
    assert.equal(globBase('/*').pattern, '*');

    assert.equal(globBase('a/***').base, 'a');
    assert.equal(globBase('a/***').pattern, '***');

    assert.equal(globBase('a/**/b/*.{foo,bar}').base, 'a');
    assert.equal(globBase('a/**/b/*.{foo,bar}').pattern, '**/b/*.{foo,bar}');

    assert.equal(globBase('a/**/c/*').base, 'a');
    assert.equal(globBase('a/**/c/*').pattern, '**/c/*');

    assert.equal(globBase('a/**/c/*.md').base, 'a');
    assert.equal(globBase('a/**/c/*.md').pattern, '**/c/*.md');

    assert.equal(globBase('a/**/e').base, 'a');
    assert.equal(globBase('a/**/e').pattern, '**/e');

    assert.equal(globBase('a/**/j/**/z/*.md').base, 'a');
    assert.equal(globBase('a/**/j/**/z/*.md').pattern, '**/j/**/z/*.md');

    assert.equal(globBase('a/**/z/*.md').base, 'a');
    assert.equal(globBase('a/**/z/*.md').pattern, '**/z/*.md');

    assert.equal(globBase('a/**c*').base, 'a');
    assert.equal(globBase('a/**c*').pattern, '**c*');

    assert.equal(globBase('a/**c/*').base, 'a');
    assert.equal(globBase('a/**c/*').pattern, '**c/*');

    assert.equal(globBase('a/*/*/e').base, 'a');
    assert.equal(globBase('a/*/*/e').pattern, '*/*/e');

    assert.equal(globBase('a/*/c/*.md').base, 'a');
    assert.equal(globBase('a/*/c/*.md').pattern, '*/c/*.md');

    assert.equal(globBase('a/b/**/c{d,e}/**/xyz.md').base, 'a/b');
    assert.equal(globBase('a/b/**/c{d,e}/**/xyz.md').pattern, '**/c{d,e}/**/xyz.md');

    assert.equal(globBase('a/b/**/e').base, 'a/b');
    assert.equal(globBase('a/b/**/e').pattern, '**/e');

    assert.equal(globBase('a/b/*.{foo,bar}').base, 'a/b');
    assert.equal(globBase('a/b/*.{foo,bar}').pattern, '*.{foo,bar}');

    assert.equal(globBase('a/b/*/e').base, 'a/b');
    assert.equal(globBase('a/b/*/e').pattern, '*/e');

    assert.equal(globBase('a/b/c/*').base, 'a/b/c');
    assert.equal(globBase('a/b/c/*').pattern, '*');

    assert.equal(globBase('a/b/c/*.md').base, 'a/b/c');
    assert.equal(globBase('a/b/c/*.md').pattern, '*.md');

    assert.equal(globBase('a/b/c/.*.md').base, 'a/b/c');
    assert.equal(globBase('a/b/c/.*.md').pattern, '.*.md');

    assert.equal(globBase('b/*/*/*').base, 'b');
    assert.equal(globBase('b/*/*/*').pattern, '*/*/*');
  });

  it('file extensions:', function () {
    assert.equal(globBase('.md').base, '.');
    assert.equal(globBase('.md').pattern, '.md');
  });

  it('negation pattern:', function () {
    assert.equal(globBase('!*.min.js').base, '.');
    assert.equal(globBase('!*.min.js').pattern, '!*.min.js');

    assert.equal(globBase('!foo').base, '.');
    assert.equal(globBase('!foo').pattern, '!foo');

    assert.equal(globBase('a/b/c/!foo').base, 'a/b/c');
    assert.equal(globBase('a/b/c/!foo').pattern, '!foo');

    assert.equal(globBase('!foo/(a|b).min.js').base, '.');
    assert.equal(globBase('!foo/(a|b).min.js').pattern, '!foo/(a|b).min.js');

    assert.equal(globBase('!foo/[a-b].min.js').base, '.');
    assert.equal(globBase('!foo/[a-b].min.js').pattern, '!foo/[a-b].min.js');

    assert.equal(globBase('!foo/{a,b}.min.js').base, '.');
    assert.equal(globBase('!foo/{a,b}.min.js').pattern, '!foo/{a,b}.min.js');
  });

  describe('braces:', function () {
    it('should know when a base cannot be extracted:', function () {
      assert.equal(globBase('/a/b/{c,/foo.js}/e.f.g/').base, '/a/b');
      assert.equal(globBase('/a/b/{c,/foo.js}/e.f.g/').pattern, '{c,/foo.js}/e.f.g/');

      assert.equal(globBase('{a/b/c.js,/a/b/{c,/foo.js}/e.f.g/}').base, '.');
      assert.equal(globBase('{a/b/c.js,/a/b/{c,/foo.js}/e.f.g/}').pattern, '{a/b/c.js,/a/b/{c,/foo.js}/e.f.g/}');

      assert.equal(globBase('/a/b/{c,d}/').base, '/a/b');
      assert.equal(globBase('/a/b/{c,d}/').pattern, '{c,d}/');

      assert.equal(globBase('/a/b/{c,d}/*.js').base, '/a/b');
      assert.equal(globBase('/a/b/{c,d}/*.js').pattern, '{c,d}/*.js');

      assert.equal(globBase('/a/b/{c,d}/*.min.js').base, '/a/b');
      assert.equal(globBase('/a/b/{c,d}/*.min.js').pattern, '{c,d}/*.min.js');

      assert.equal(globBase('/a/b/{c,d}/e.f.g/').base, '/a/b');
      assert.equal(globBase('/a/b/{c,d}/e.f.g/').pattern, '{c,d}/e.f.g/');

      assert.equal(globBase('{.,*}').base, '.');
      assert.equal(globBase('{.,*}').pattern, '{.,*}');
    });

    it('should work when the filename has braces:', function () {
      assert.equal(globBase('a/b/.{c,.gitignore}').base, 'a/b');
      assert.equal(globBase('a/b/.{c,.gitignore}').pattern, '.{c,.gitignore}');

      assert.equal(globBase('a/b/.{c,/.gitignore}').base, 'a/b');
      assert.equal(globBase('a/b/.{c,/.gitignore}').pattern, '.{c,/.gitignore}');

      assert.equal(globBase('a/b/.{foo,bar}').base, 'a/b');
      assert.equal(globBase('a/b/.{foo,bar}').pattern, '.{foo,bar}');

      assert.equal(globBase('a/b/{c,.gitignore}').base, 'a/b');
      assert.equal(globBase('a/b/{c,.gitignore}').pattern, '{c,.gitignore}');

      assert.equal(globBase('a/b/{c,/.gitignore}').base, 'a/b');
      assert.equal(globBase('a/b/{c,/.gitignore}').pattern, '{c,/.gitignore}');

      assert.equal(globBase('a/b/{c,/gitignore}').base, 'a/b');
      assert.equal(globBase('a/b/{c,/gitignore}').pattern, '{c,/gitignore}');

      assert.equal(globBase('a/b/{c,d}').base, 'a/b');
      assert.equal(globBase('a/b/{c,d}').pattern, '{c,d}');
    });

    it('should work when the dirname has braces:', function () {
      assert.equal(globBase('a/b/{c,./d}/e/f.g').base, 'a/b');
      assert.equal(globBase('a/b/{c,./d}/e/f.g').pattern, '{c,./d}/e/f.g');

      assert.equal(globBase('a/b/{c,./d}/e/f.min.g').base, 'a/b');
      assert.equal(globBase('a/b/{c,./d}/e/f.min.g').pattern, '{c,./d}/e/f.min.g');

      assert.equal(globBase('a/b/{c,.gitignore,{a,./b}}/{a,b}/abc.foo.js').base, 'a/b');
      assert.equal(globBase('a/b/{c,.gitignore,{a,./b}}/{a,b}/abc.foo.js').pattern, '{c,.gitignore,{a,./b}}/{a,b}/abc.foo.js');

      assert.equal(globBase('a/b/{c,.gitignore,{a,b}}/{a,b}/*.foo.js').base, 'a/b');
      assert.equal(globBase('a/b/{c,.gitignore,{a,b}}/{a,b}/*.foo.js').pattern, '{c,.gitignore,{a,b}}/{a,b}/*.foo.js');

      assert.equal(globBase('a/b/{c,.gitignore,{a,b}}/{a,b}/abc.foo.js').base, 'a/b');
      assert.equal(globBase('a/b/{c,.gitignore,{a,b}}/{a,b}/abc.foo.js').pattern, '{c,.gitignore,{a,b}}/{a,b}/abc.foo.js');

      assert.equal(globBase('a/b/{c,/d}/e/f.g').base, 'a/b');
      assert.equal(globBase('a/b/{c,/d}/e/f.g').pattern, '{c,/d}/e/f.g');

      assert.equal(globBase('a/b/{c,/d}/e/f.min.g').base, 'a/b');
      assert.equal(globBase('a/b/{c,/d}/e/f.min.g').pattern, '{c,/d}/e/f.min.g');

      assert.equal(globBase('a/b/{c,d}/').base, 'a/b');
      assert.equal(globBase('a/b/{c,d}/').pattern, '{c,d}/');

      assert.equal(globBase('a/b/{c,d}/*.js').base, 'a/b');
      assert.equal(globBase('a/b/{c,d}/*.js').pattern, '{c,d}/*.js');

      assert.equal(globBase('a/b/{c,d}/*.min.js').base, 'a/b');
      assert.equal(globBase('a/b/{c,d}/*.min.js').pattern, '{c,d}/*.min.js');

      assert.equal(globBase('a/b/{c,d}/e.f.g/').base, 'a/b');
      assert.equal(globBase('a/b/{c,d}/e.f.g/').pattern, '{c,d}/e.f.g/');

      assert.equal(globBase('a/b/{c,d}/e/f.g').base, 'a/b');
      assert.equal(globBase('a/b/{c,d}/e/f.g').pattern, '{c,d}/e/f.g');

      assert.equal(globBase('a/b/{c,d}/e/f.min.g').base, 'a/b');
      assert.equal(globBase('a/b/{c,d}/e/f.min.g').pattern, '{c,d}/e/f.min.g');

      assert.equal(globBase('foo/{a,b}.min.js').base, 'foo');
      assert.equal(globBase('foo/{a,b}.min.js').pattern, '{a,b}.min.js');
    });
  });

  it('character classes:', function () {
    assert.equal(globBase('[a-c]b*').base, '.');
    assert.equal(globBase('[a-c]b*').pattern, '[a-c]b*');

    assert.equal(globBase('[a-j]*[^c]').base, '.');
    assert.equal(globBase('[a-j]*[^c]').pattern, '[a-j]*[^c]');

    assert.equal(globBase('[a-j]*[^c]b/c').base, '.');
    assert.equal(globBase('[a-j]*[^c]b/c').pattern, '[a-j]*[^c]b/c');

    assert.equal(globBase('[a-j]*[^c]bc').base, '.');
    assert.equal(globBase('[a-j]*[^c]bc').pattern, '[a-j]*[^c]bc');

    assert.equal(globBase('[ab][ab]').base, '.');
    assert.equal(globBase('[ab][ab]').pattern, '[ab][ab]');

    assert.equal(globBase('foo/[a-b].min.js').base, 'foo');
    assert.equal(globBase('foo/[a-b].min.js').pattern, '[a-b].min.js');
  });

  it('qmarks:', function () {
    assert.equal(globBase('?').base, '.');
    assert.equal(globBase('?').pattern, '?');

    assert.equal(globBase('?/?').base, '.');
    assert.equal(globBase('?/?').pattern, '?/?');

    assert.equal(globBase('??').base, '.');
    assert.equal(globBase('??').pattern, '??');

    assert.equal(globBase('???').base, '.');
    assert.equal(globBase('???').pattern, '???');

    assert.equal(globBase('?a').base, '.');
    assert.equal(globBase('?a').pattern, '?a');

    assert.equal(globBase('?b').base, '.');
    assert.equal(globBase('?b').pattern, '?b');

    assert.equal(globBase('a?b').base, '.');
    assert.equal(globBase('a?b').pattern, 'a?b');

    assert.equal(globBase('a/?/c.js').base, 'a');
    assert.equal(globBase('a/?/c.js').pattern, '?/c.js');

    assert.equal(globBase('a/?/c.md').base, 'a');
    assert.equal(globBase('a/?/c.md').pattern, '?/c.md');

    assert.equal(globBase('a/?/c/?/*/f.js').base, 'a');
    assert.equal(globBase('a/?/c/?/*/f.js').pattern, '?/c/?/*/f.js');

    assert.equal(globBase('a/?/c/?/*/f.md').base, 'a');
    assert.equal(globBase('a/?/c/?/*/f.md').pattern, '?/c/?/*/f.md');

    assert.equal(globBase('a/?/c/?/e.js').base, 'a');
    assert.equal(globBase('a/?/c/?/e.js').pattern, '?/c/?/e.js');

    assert.equal(globBase('a/?/c/?/e.md').base, 'a');
    assert.equal(globBase('a/?/c/?/e.md').pattern, '?/c/?/e.md');

    assert.equal(globBase('a/?/c/???/e.js').base, 'a');
    assert.equal(globBase('a/?/c/???/e.js').pattern, '?/c/???/e.js');

    assert.equal(globBase('a/?/c/???/e.md').base, 'a');
    assert.equal(globBase('a/?/c/???/e.md').pattern, '?/c/???/e.md');

    assert.equal(globBase('a/??/c.js').base, 'a');
    assert.equal(globBase('a/??/c.js').pattern, '??/c.js');

    assert.equal(globBase('a/??/c.md').base, 'a');
    assert.equal(globBase('a/??/c.md').pattern, '??/c.md');

    assert.equal(globBase('a/???/c.js').base, 'a');
    assert.equal(globBase('a/???/c.js').pattern, '???/c.js');

    assert.equal(globBase('a/???/c.md').base, 'a');
    assert.equal(globBase('a/???/c.md').pattern, '???/c.md');

    assert.equal(globBase('a/????/c.js').base, 'a');
    assert.equal(globBase('a/????/c.js').pattern, '????/c.js');
  });

  it('non-glob pattern:', function () {
    assert.equal(globBase('').base, '.');
    assert.equal(globBase('').pattern, '');

    assert.equal(globBase('.').base, '.');
    assert.equal(globBase('.').pattern, '.');

    assert.equal(globBase('a').base, '.');
    assert.equal(globBase('a').pattern, 'a');

    assert.equal(globBase('.a').base, '.');
    assert.equal(globBase('.a').pattern, '.a');

    assert.equal(globBase('/a').base, '/');
    assert.equal(globBase('/a').pattern, 'a');

    assert.equal(globBase('/a/b/c').base, '/a/b');
    assert.equal(globBase('/a/b/c').pattern, 'c');

    assert.equal(globBase('/a/b/c/').base, '/a/b/c/');
    assert.equal(globBase('/a/b/c/').pattern, '');

    assert.equal(globBase('a/b/c/').base, 'a/b/c/');
    assert.equal(globBase('a/b/c/').pattern, '');

    assert.equal(globBase('a.min.js').base, '.');
    assert.equal(globBase('a.min.js').pattern, 'a.min.js');

    assert.equal(globBase('a/.x.md').base, 'a');
    assert.equal(globBase('a/.x.md').pattern, '.x.md');

    assert.equal(globBase('a/b/.gitignore').base, 'a/b');
    assert.equal(globBase('a/b/.gitignore').pattern, '.gitignore');

    assert.equal(globBase('a/b/c/d.md').base, 'a/b/c');
    assert.equal(globBase('a/b/c/d.md').pattern, 'd.md');

    assert.equal(globBase('a/b/c/d.e.f/g.min.js').base, 'a/b/c/d.e.f');
    assert.equal(globBase('a/b/c/d.e.f/g.min.js').pattern, 'g.min.js');

    assert.equal(globBase('a/b/.git').base, 'a/b');
    assert.equal(globBase('a/b/.git').pattern, '.git');

    assert.equal(globBase('a/b/.git/').base, 'a/b/.git/');
    assert.equal(globBase('a/b/.git/').pattern, '');

    assert.equal(globBase('a/b/.git/').base, 'a/b/.git/');
    assert.equal(globBase('a/b/.git/**').pattern, '**');

    assert.equal(globBase('a/b/.gitignore').base, 'a/b');
    assert.equal(globBase('a/b/.gitignore').pattern, '.gitignore');

    assert.equal(globBase('a/b/c').base, 'a/b');
    assert.equal(globBase('a/b/c').pattern, 'c');

    assert.equal(globBase('a/b/c.d/e.md').base, 'a/b/c.d');
    assert.equal(globBase('a/b/c.d/e.md').pattern, 'e.md');

    assert.equal(globBase('a/b/c.md').base, 'a/b');
    assert.equal(globBase('a/b/c.md').pattern, 'c.md');

    assert.equal(globBase('a/b/c.min.js').base, 'a/b');
    assert.equal(globBase('a/b/c.min.js').pattern, 'c.min.js');

    assert.equal(globBase('a/b/c/').base, 'a/b/c/');
    assert.equal(globBase('a/b/c/').pattern, '');

    assert.equal(globBase('a/b/c/d.e.f/g.min.js').base, 'a/b/c/d.e.f');
    assert.equal(globBase('a/b/c/d.e.f/g.min.js').pattern, 'g.min.js');

    assert.equal(globBase('a/b/c/d.md').base, 'a/b/c');
    assert.equal(globBase('a/b/c/d.md').pattern, 'd.md');

    assert.equal(globBase('a/b/git/').base, 'a/b/git/');
    assert.equal(globBase('a/b/git/').pattern, '');

    assert.equal(globBase('aa').base, '.');
    assert.equal(globBase('aa').pattern, 'aa');

    assert.equal(globBase('ab').base, '.');
    assert.equal(globBase('ab').pattern, 'ab');

    assert.equal(globBase('bb').base, '.');
    assert.equal(globBase('bb').pattern, 'bb');

    assert.equal(globBase('c.md').base, '.');
    assert.equal(globBase('c.md').pattern, 'c.md');

    assert.equal(globBase('foo').base, '.');
    assert.equal(globBase('foo').pattern, 'foo');
  });
});
