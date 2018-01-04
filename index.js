const calculateButton = document.querySelector('.calculate');
const description = document.querySelector('.description');
const amount = document.querySelector('.amount');
const transaction = document.querySelector('.transaction');

var budgetController = (function() {
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
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
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
         amount: amount.value,
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
            <div class='description'>${object.description}</div>
            <div class='value'>${object.value}</div>
            <div class='delete_button'><button class='item__delete_button'></button>
            </div>
          </div>`
          console.log(html);
          console.log(element);
          element.innerHTML += html;

        } else if (type === 'expenses') {
          const element = document.querySelector('.budget_output__expenses');
          html = `<div class='credit' id=expense-${object.ID}>
            <div class='description'>${object.description}</div>
            <div class='value'>${object.value}</div>
            <div class='delete_button'><button class='item__delete_button'></button>
            </div>
          </div>`
          console.log(element);
          console.log(html);
          element.innerHTML += html;

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
    let input;
    let newItem;

    input = UiCtrl.getInputs();
    console.log(input);
    // get input data

    // add item to budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.amount);
    console.log(newItem);

    // add new item to UI

    addItem = UiCtrl.addListItem(newItem, input.type);

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