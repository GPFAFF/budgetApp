const calculateButton = document.querySelector('.calculate');
const description = document.querySelector('.description');
const amount = document.querySelector('.amount');
const transaction = document.querySelector('.transaction');

const budgetController = (function() {
  // some code
  const Expense = function(type, description, value) {
    this.type = type;
    this.description = description;
    this.value = value;
  }

  const Credit = function (type, description, value) {
    this.type = type;
    this.description = description;
    this.value = value;
  }

  // data structure
  const data = {
    allItems: {
      expenses: [],
      income: [],
    },
    totals: {
      expenses: 0,
      income: 0,
    }
  }

  return {
    addItem: function (type, description, value) {
      let newItem;
      let ID;

      // Create New ID
      if (data.allItems[type].length > 0) {
        ID = [data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new item based on type
      if (type === 'expenses') {
         newItem = new Expense(ID, description, value)
      } else if (type === 'income') {
        newItem = new Credit(ID, description, value)
      }

      // push to data
      data.allItems[type].push(newItem);

      return newItem;
    },

    testing: () => {
      console.log(data);
    }
  };

})();

var UIController = (function() {
  // some code

  return {
    getInputs: function() {
      return {
         type: transaction.value,
         amount: Math.round(parseFloat(amount.value)),
         description: description.value
      }
    },

    addListItem: function(object, type) {

        let element;

        const expenseContainer = document.querySelector('.budget_output expenses');
        const incomeContainer = document.querySelector('.budget_output income')
        // Create HTML STRING with placeholder text

        if (type === 'income') {
          element = document.querySelector('.budget_output__income');
          html = `<div class='credit' id=income${object.ID}>
            <div class='credit__description'>${object.description}</div>
            <div class='credit__value'>${object.value}</div>
            <div class='credit__delete_button'><button class='item__delete_button'>X</button>
            </div>
          </div>`
          element.innerHTML += html;

        } else if (type === 'expenses') {
          const element = document.querySelector('.budget_output__expenses');
          html = `<div class='expense' id=expense-${object.ID}>
            <div class='expense__description'>${object.description}</div>
            <div class='expense__value'>${object.value}</div>
            <div class='expense__delete_button'>X<button class='item__delete_button'></button>
            </div>
          </div>`
          element.innerHTML += html;

        }
      },

      clearFields: function(...inputs) {
        let fieldsArray;

        fieldsArray = Array.prototype.slice.call(inputs);
        fieldsArray.forEach(function(field, index, array) {
          field.value = '';
        });

        fieldsArray[0].focus();
      }

  }

})();

const controller = (function(budgetCtrl, UiCtrl){

  function setupEvents() {
    calculateButton.addEventListener('click', addItem);
    document.addEventListener('keypress', function () {
      if (event.keyCode === 13) {
        addItem();
      }
    });
  }

  function updateBudget() {
    // calculate budget

    // Return budget

    // Display UI
  }

  function addItem() {
    event.preventDefault();
    let input;
    let newItem;

    input = UiCtrl.getInputs();
    // get input data

    if (input.description !== '' && !isNaN(input.amount) && input.amount >= 0) {
      // add item to budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.amount);
      console.log(newItem);

      // add new item to UI
      addLineItem = UiCtrl.addListItem(newItem, input.type);
      clearFields = UiCtrl.clearFields(description, amount);

      // calculate budget
      updateBudget();

      // display budget

      // if (transaction.value === '' || value.value === '' || description.value === '') {
      //   alert('error')
      // }
    }

  }

  return {
    init: function() {
      setupEvents();
  }}

})(budgetController, UIController);

console.log('loaded');

controller.init();