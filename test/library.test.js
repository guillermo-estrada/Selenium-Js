//Initial configuration
//To execute this go to the gitbash and write -> mocha test
//To use mochawesome use -> mocha test --reporter mochawesome --reporter-options autoOpen=true
var webdriver = require ('selenium-webdriver'),
{describe, it, after, before} = require('selenium-webdriver/testing'),
  By = webdriver.By,
  until = webdriver.until;
  var driver;

describe('library app scenarios', function(){
  this.timeout(40000);
  beforeEach(function(){
    driver = new webdriver.Builder().forBrowser('firefox').build();
    driver.get('http://library-app.firebaseapp.com');
  });

  afterEach(function(){
    driver.quit();
  });

  it('Changes Button opacity when the email input filled out', function(){
    var submitBtn = driver.findElement(By.css('.btn-primary'));
    driver.findElement(By.css('input')).sendKeys('user@fakemail.com');
    driver.wait(function(){
      return submitBtn.getCssValue('opacity').then(function(result){
        return result == 1;
      })
    }, 5000);
  });

  it('Writes, send and wait for the alert', function(){
    var submitBtn = driver.findElement(By.css('.btn-primary'));
    driver.findElement(By.css('input')).sendKeys('user@fakemail.com');
    submitBtn.click();
    driver.wait(until.elementLocated(By.css('.alert-success')), 5000).getText().then(function(txt){
      console.log("Alert success with text: " + txt);
    });
  });

  it('Search for the button and NavBar', function(){
    var submitBtn = driver.findElement(By.css('.btn-primary'));
    submitBtn.getText().then(function(txt){
      console.log("Found button with text = " + txt);
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
