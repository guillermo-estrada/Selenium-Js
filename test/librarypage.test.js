//To execute this go to the gitbash and write -> mocha test/librarypage.test.js
//To use mochawesome use -> mocha test/librarypage.test.js  --reporter mochawesome --reporter-options autoOpen=true
var {describe, it, after, before} = require('selenium-webdriver/testing');
var Page = require('../lib/home_page');
var page;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var should = chai.should();

chai.use(chaiAsPromised);

describe('library app scenarios', function(){
  this.timeout(40000);
  beforeEach(function(){
    page = new Page();
    page.visit('http://library-app.firebaseapp.com');
  });

  afterEach(function(){
    page.quit();
  });

  it('Validate email, button opacity must be 1', function(){
    var btn = page.requestBtn();
    btn.opacity.should.eventually.equal('1');
  });

  it('Validate email, button must be enabled', function(){
    var btn = page.requestBtn();
    btn.state.should.eventually.be.true;
  });

  it('Validate success', function(){
    var alert = page.alertSuccess();
    alert.should.eventually.contain('Thank you');
  });
});
