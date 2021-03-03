//Initial configuration
//To execute this go to the gitbash and write -> node library.js
var webdriver = require ('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

//Set webdriver for a browser
var driver = new webdriver.Builder().forBrowser('chrome').build();

//URL from the page we want
driver.get('http://library-app.firebaseapp.com');

//Webdriver will wait implicitly between 0 and 5000 milis to avoid to use sleep
//driver.manage().timeouts().implicitlyWait(5000);

//We can store elements inside a variable
var submitBtn = driver.findElement(By.css('.btn-primary'));

//How to find single element
driver.findElement(By.css('input')).then(function(el){
  console.log("Success " + el);
});

//How to find single element and print it's text
submitBtn.getText().then(function(txt){
  console.log("Found button with text = " + txt);
});

//How to find multiple elements and print their text
driver.findElements(By.css('nav li')).then(function(elements){
  elements.map(function(el){
    el.getText().then(function(txt){
      console.log("Found Nav Bar elements " + txt);
    });
  });
});
//How to send text
driver.findElement(By.css('input')).sendKeys('us');

//Custom Explicit Wait
driver.wait(function(){
  return submitBtn.getCssValue('opacity').then(function(result){
    return result == 1;
  })
}, 15000);

//How to send click
submitBtn.click();

//Explicit wait - waits until some item do something with a max timeout
driver.wait(until.elementLocated(By.css('.alert-success')), 5000);

//Find an alert and print it's text
driver.findElement(By.css('.alert-success')).getText().then(function(txt){
  console.log("Alert success with text: " + txt);
});

//Sleep timeout
driver.sleep(10000);

//close the browser
driver.quit();
