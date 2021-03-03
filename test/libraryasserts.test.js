//Initial configuration
//To execute this go to the gitbash and write -> test/libraryasserts.test.js
//To use mochawesome use -> mocha test/libraryasserts.test.js  --reporter mochawesome --reporter-options autoOpen=true
var webdriver = require ('selenium-webdriver'),
{describe, it, after, before} = require('selenium-webdriver/testing'),
  By = webdriver.By,
  assert = require('assert'),
  until = webdriver.until,
  //This is for access directly to firefox options
  firefox = require('selenium-webdriver/firefox');
  var o = new firefox.Options();
  o.addArguments('disable-infobars'); //this line disable the info bars in the browser
  var driver;

describe('library app scenarios', function(){
  this.timeout(40000);
  beforeEach(function(){
    //driver = new webdriver.Builder().forBrowser('firefox').build();
    //Here we put the options to the firefox browser
    driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.firefox()).setFirefoxOptions(o).build();
    driver.get('http://library-app.firebaseapp.com');
    //driver.manage().window().setPosition(0, -600);
    //driver.manage().window().maximize();
  });

  afterEach(function(){
    driver.quit();
  });

  it('Changes Button opacity when the email input filled out', function(){
    var submitBtn = driver.findElement(By.css('.btn-primary'));
    driver.findElement(By.css('input')).sendKeys('user@fakemail.com');
    return submitBtn.getCssValue('opacity').then(function(result){
    assert(result === '1');
    });
  });

  it('Writes, send and wait for the alert', function(){
    var submitBtn = driver.findElement(By.css('.btn-primary'));
    driver.findElement(By.css('input')).sendKeys('user@fakemail.com');
    submitBtn.click();
    driver.wait(until.elementLocated(By.css('.alert-success')), 5000);
    driver.findElements(By.css('.alert-success')).then(function(result){
      assert(result.length === 1, result.length + " alert-success were found")
    });
  });

  it('Search for the button and NavBar', function(){
    var submitBtn = driver.findElements(By.css('.btn-primary')).then(function(result){
      assert.equal(result.length, 1);
    });
    driver.findElements(By.css('nav li')).then(function(elements){
      elements.map(function(el){
        el.getText().then(function(txt){
          console.log("Found Nav Bar elements " + txt);
        });
      });
    });

  });
});
