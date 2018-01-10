const calculateButton = document.querySelector('.calculate');
const description = document.querySelector('.description');
const amount = document.querySelector('.amount');
const transaction = document.querySelector('.transaction');
const budget = document.querySelector('.budget');
const budgetIncome = document.querySelector('.budget_income__income');
const budgetExpenses = document.querySelector('.budget_expenses__expenses');
const percentageLabel = document.querySelector('.budget__percentage_label');
const budgetContainer = document.querySelector('.budget_output');
const dateLabel = document.querySelector('.budget__date_label');

const budgetController = (function () {
  // some code
  const Expense = function (type, description, value, percentage) {
    this.type = type;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  }

  Expense.prototype.calculatePercentage = function(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  }

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  }

  const Credit = function (type, description, value) {
    this.type = type;
    this.description = description;
    this.value = value;
  }

  function calculateTotal(type) {
    let sum = 0;

    let loopedArray = data.allItems[type];

    loopedArray.forEach(current => {
      sum += current.value;
    });

    data.totals[type] = sum;
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
    },
    budget: 0,
    percentage: []
  }

  return {
    addItem: function (type, description, value) {
      let newItem;
      let Id;

      if (data.allItems[type].length > 0) {
        Id = ([data.allItems[type].length])[0]
      } else {
        Id = 0;
      }

      // Create new item based on type
      if (type === 'expenses') {
        newItem = new Expense(Id, description, value)
      } else if (type === 'income') {
        newItem = new Credit(Id, description, value)
      }

      // push to data
      data.allItems[type].push(newItem);
      return newItem;
    },

    deleteItem: function (type, id) {
      let index
      let ids;

      ids = data.allItems[type].map(function (item) {
        return item.type;
      })
      index = ids.indexOf(id)

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    calculateBudget: function () {

      // calculate total income and expenses
      calculateTotal('expenses');
      calculateTotal('income');

      // calculate budget (income - expenses)
      data.budget = data.totals.income - data.totals.expenses;

      if (data.totals.income > 0) {
        // calculate percentage of income spent
        data.percentage = Math.round((data.totals.expenses / data.totals.income) * 100);
      } else {
        data.percentage = -1;
      }
      return data.budget;
    },

    calculatePercentages: function() {
      const expenses = data.allItems.expenses;

      expenses.forEach(function(item) {
        item.calculatePercentage(data.totals.income);
     })
    },

    getPercentages: function() {
      const allPercentages = data.allItems.expenses.map(function(item) {
        return item.getPercentage();
      })
      return allPercentages;
    },

    getBudget: function () {
      return {
        budget: data.budget,
        percentage: data.percentage,
        income: data.totals.income,
        expenses: data.totals.expenses
      }
    },
  };

})();

var UIController = (function () {
  // some code

  const nodeListForEach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  }

  return {
    getInputs: function () {
      return {
        type: transaction.value,
        amount: Math.round(parseFloat(amount.value)),
        description: description.value
      }
    },

    addListItem: function (object, type) {

      let element;
      const expenseContainer = document.querySelector('.budget_output expenses');
      const incomeContainer = document.querySelector('.budget_output income')
      // Create HTML STRING with placeholder text

      if (type === 'income') {
        element = document.querySelector('.budget_output__income');
        html = `<div class='credit' id=income-${object.type}>
          <div class='credit__description'>${object.description}</div>
          <div class='credit__value'>${this.formatNumber(object.value, type)}</div>
          <div class='credit__delete_button'>
            <button class='item__delete_button'>X</button>
          </div>
        </div>`
        element.innerHTML += html;

      } else if (type === 'expenses') {
        const element = document.querySelector('.budget_output__expenses');
        html = `<div class='expenses' id=expenses-${object.type}>
          <div class='expenses__description'>${object.description}</div>
          <div class='expenses__value'>${this.formatNumber(object.value, type)}</div>
          <div class='expenses__percentage_label'>${object.percentage}</div>
          <div class='expenses__delete_button'>
            <button class='item__delete_button'>X</button>
          </div>
        </div>`
        element.innerHTML += html;
      }
    },

    deleteListItem: function (selector) {
      const deletedItem = document.getElementById(selector);
      deletedItem.parentNode.removeChild(deletedItem);

    },

    clearFields: function (...inputs) {
      let fieldsArray;

      fieldsArray = Array.prototype.slice.call(inputs);
      fieldsArray.forEach(function (field, index, array) {
        field.value = '';
      });

      fieldsArray[0].focus();
    },

    displayBudget: function (object) {
      let type;
      object.budget > 0 ? type = 'income' : 'expenses';

      budget.textContent = this.formatNumber(object.budget, type);
      budgetExpenses.textContent = this.formatNumber(object.expenses, 'expenses');
      budgetIncome.textContent = this.formatNumber(object.income, 'income');

      if (object.percentage > 0) {
        percentageLabel.textContent = object.percentage;
      } else {
        percentageLabel.textContent = '------';
      }

    },

    displayPercentages: function(percentages) {
      const expensePercentageLabel = document.querySelectorAll('.expenses__percentage_label');

      nodeListForEach(expensePercentageLabel, function(current, index) {
        if (percentages[index] > 0) {
          current.textContent = `${percentages[index]}%`;
        } else {
          current.textContent = '======';
        }
      });

    },

    displayDate: function() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

      dateLabel.textContent = `${months[month]} ${year}:`;
    },

    inputType: function() {

      const fields = [description, amount, transaction];
      nodeListForEach(fields, function(current) {
        current.classList.toggle('red');
      })

      calculateButton.classList.toggle('red');
    },

    formatNumber: function(num, type) {
      num = Math.abs(num);
      num = num.toFixed(2);

      const numSplit = num.split('.');

      const int = numSplit[0];

      if (int.length > 3) {
        `${int.substr(0, int.length -1)},${int.substr(int.length -3, int.length)}`;
      }

      const dec = numSplit[1];
      return (type === 'expenses' ? '-' : '+') + ' ' + int + '.' + dec;

      //return `(${type} === 'expenses' ? '-' : '+')${int} ${dec}`
      //return `(${type}` === 'expenses' ? `${sign = '-'}` : `${sign = '+'}` `${int} ${dec}`;

    }

  }

})();

const controller = (function (budgetCtrl, UiCtrl) {

  function setupEvents() {
    calculateButton.addEventListener('click', addItem);
    document.addEventListener('keypress', function () {
      if (event.keyCode === 13) {
        addItem();
      }
    });
    budgetContainer.addEventListener('click', ctrlDeleteItem);
    document.addEventListener('change', UiCtrl.inputType);
  }

  // calculate budget
  function updateBudget() {
    // calculate budget
    budgetCtrl.calculateBudget();
    // return budget
    var budget = budgetCtrl.getBudget();
    // display budget on UI
    UiCtrl.displayBudget(budget);
  }

  function updatePercentages() {
    // calculate percentages
    budgetCtrl.calculatePercentages();
    // read them from Budget Ctrl
    const percentages = budgetCtrl.getPercentages();
    // Update UI
    UiCtrl.displayPercentages(percentages);
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

      // add new item to UI
      addLineItem = UiCtrl.addListItem(newItem, input.type);
      clearFields = UiCtrl.clearFields(description, amount);

      // Calculate and update budget
      updateBudget();

      // Calculate and update percentages
      updatePercentages();
    }

  }

  function ctrlDeleteItem(event) {
    let itemID;
    let splitID;
    let type;
    let Id;
    itemID = event.target.parentNode.parentNode.id;

    if (itemID) {
      splitID = itemID.split('-');
      type = splitID[0];
      Id = parseInt(splitID[1]);

      budgetCtrl.deleteItem(type, Id)

      UiCtrl.deleteListItem(itemID);

      // Update and show new budget
      updateBudget();

      // Update new percentages
      updatePercentages();
    }
  }

  return {
    init: function () {
      setupEvents();
      UiCtrl.displayDate();
      UiCtrl.displayBudget({
        budget: 0,
        percentage: 0,
        expenses: 0,
        income: 0,
      })
    }
  }

})(budgetController, UIController);

console.log('loaded');

controller.init();