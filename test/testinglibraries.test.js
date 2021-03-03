//To execute this go to the gitbash and write -> mocha test/testinglibraries.test.js
//To use mochawesome use -> mocha test/testinglibraries.test.js  --reporter mochawesome --reporter-options autoOpen=true
var {describe, it, after, before} = require('selenium-webdriver/testing');
var Page = require('../lib/libraries_page');
var page;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var should = chai.should();

chai.use(chaiAsPromised);

describe('Testing libraries page on the App', function(){
  this.timeout(40000);
  beforeEach(function(){
    page = new Page();
    page.visit('http://library-app.firebaseapp.com/libraries');
  });

  afterEach(function(){
    page.quit();
  });

  it('List Libraries', function(){
    var libraries = page.listLibraries();
    libraries.libraries.should.eventually.have.length.above(10);
  });

  it('Add new library', function(){
    var addLibrary = page.addLibrary();
    addLibrary.libraryList.should.eventually.contain(addLibrary.libraryName);
  });

  it('Filter libraries', function(){
    var libraries = page.filterLibrary();
    libraries.libraryList.should.eventually.contain(libraries.newLibrary);
  });
});
