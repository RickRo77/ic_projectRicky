import { html, render } from 'lit-html';

class FinanceTracker {
  constructor() {
    this.transactions = [];
    this.balance = 0;
    this.render();
  }

  handleAddTransaction = (e) => {
    console.log("Working");
    e.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (description === '' || isNaN(amount)) {
      alert('Please provide a valid description and amount.');
      return;
    }

    this.transactions.push({ description, amount });
    this.updateBalance();
    this.render();

    // Clear input fields
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
  };

  updateBalance() {
    this.balance = this.transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  }

  render() {
    console.log("Working");
    const transactionElements = this.transactions.map(transaction => html`
      <div class="transaction ${transaction.amount >= 0 ? 'income' : 'expense'}">
        <span>${transaction.description}</span>
        <span>${transaction.amount >= 0 ? '+' : ''}$${transaction.amount.toFixed(2)}</span>
      </div>
    `);

    const body = html`
      <h2 id="balance">Balance: $${this.balance.toFixed(2)}</h2>
      <form @submit="${this.handleAddTransaction}">
        <label for="description">Description: </label>
        <input id="description" placeholder="Enter description" required />
        <label for="amount">Amount: </label>
        <input id="amount" type="number" placeholder="Enter amount" required />
        <button type="submit">Add Transaction</button>
      </form>
      <div id="transactions">${transactionElements}</div>
    `;

    render(body, document.getElementById('root'));
  }
}

export default FinanceTracker;



// import { html, render } from 'lit-html';
// import { hello_backend } from 'declarations/hello_backend';
// import logo from './logo2.svg';

// class App {
//   greeting = '';

//   constructor() {
//     this.#render();
//   }

//   #handleSubmit = async (e) => {
//     e.preventDefault();
//     const name = document.getElementById('name').value;
//     this.greeting = await hello_backend.greet(name);
//     this.#render();
//   };

//   #render() {
//     let body = html`
//       <main>
//         <img src="${logo}" alt="DFINITY logo" />
//         <br />
//         <br />
//         <form action="#">
//           <label for="name">Enter your name: &nbsp;</label>
//           <input id="name" alt="Name" type="text" />
//           <button type="submit">Click Me!</button>
//         </form>
//         <section id="greeting">${this.greeting}</section>
//       </main>
//     `;
//     render(body, document.getElementById('root'));
//     document
//       .querySelector('form')
//       .addEventListener('submit', this.#handleSubmit);
//   }
// }

// export default App;
