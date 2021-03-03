var Page = require('./base_page');
var locator = require('../utils/locators');
var input = locator.emailInput;
var button = locator.requestInviteBtn;
var alert = locator.alertSuccess;

Page.prototype.requestBtn = function(){
  this.write(input, this.fake().email);
  return{
    opacity: this.find(button).getCssValue('opacity'),
    state: this.find(button).isEnabled()
  }
}

Page.prototype.clickSubmit = function(){
  return this.find(button).click();
}

Page.prototype.alertSuccess = function(){
  this.requestBtn();
  this.clickSubmit();
  return this.find(alert).getText();
}

module.exports = Page;
