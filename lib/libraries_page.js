var page = require('./base_page');
var locator = require('../utils/locators');
var libraryItem = locator.libraryItem;
var libraryName = locator.nameInput;
var libraryAddress = locator.addressInput;
var libraryPhone = locator.phoneInput;
var createBtn = locator.createBtn;
var libraryContainer = locator.libraryContainer;
var inputFilter = locator.filterInput;

//List Libraries
page.prototype.listLibraries = function(){
  return {
    libraries: this.findAll(libraryItem),
    printlibraries: this.findAll(libraryItem).then(function(elements){
      elements.map(function(el){
        el.getText().then(function(txt){
          console.log("Found Libraries " + txt);
        });
      });
    })
  }
}

//Add library
page.prototype.addLibrary = function(name){
  var fakeLibraryName;
  if(name){
    fakeLibraryName = name;
  }else{
    fakeLibraryName = this.fake().libraryName;
  }
  var fakeLibraryAddress = this.fake().address;
  var fakeLibraryPhone = this.fake().phone;
  this.findLink("Add new").click();
  this.writexp(libraryName, fakeLibraryName);
  this.writexp(libraryAddress, fakeLibraryAddress);
  this.writexp(libraryPhone, fakeLibraryPhone);
  this.findxp(createBtn).click();
  return{
    libraryList: this.findxp(libraryContainer).getText(),
    libraryName: fakeLibraryName
  }
}

//Filter Library
page.prototype.filterLibrary = function(){
  var newLibrary = this.fake().libraryName;
  this.addLibrary(newLibrary);
  this.writexp(inputFilter, newLibrary);
  return{
    libraryList: this.findxp(libraryContainer).getText(),
    newLibrary: newLibrary
  }
}

module.exports = page;
