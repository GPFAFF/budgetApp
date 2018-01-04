const calculateButton = document.querySelector('.calculate');
const description = document.querySelector('.description');
const amount = document.querySelector('.amount');
const transaction = document.querySelector('.transaction');

var budgetController = (function() {
  // some code
  const Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  const Credit = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  // data structure
  const data = {
    allItems: {
      expenses: [],
      credits: [],
    },
    totals: {
      expenses: 0,
      credits: 0,
    }
  }

})();

var UIController = (function() {
  // some code

  return {
    getInputs: function() {

      return {
         type: transaction.value,
         amount: amount.value,
         description: description.value
      }
    }
  }

})();

const controller = (function(budgetCtrl, UiCtrl){

  const setupEvents = () => {
    calculateButton.addEventListener('click', addItem);
    document.addEventListener('keypress', function () {
      if (event.keyCode === 13) {
        addItem();
      }
    });
  }

  function addItem() {
    event.preventDefault();

    const input = UiCtrl.getInputs();
    console.log(input);
    // get input data

    // add item to budget controller

    // add new item to UI

    // calculate budget

    // display budget

    if (transaction.value === '' || value.value === '' || description.value === '') {
      alert('error')
    }
  }

  return {
    init: setupEvents()
  }

})(budgetController, UIController);

console.log('loaded');