import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-02-14 11:00:00'),
        },
      ],
    })
  },
  
  routes() {
    this.namespace = 'api'; 

    // vai retornar todas as transações que eu tenho dentro do meu banco de dados
    this.get('/transactions', () => { 
      return this.schema.all('transaction') 
    })

/*     this.get('/transactions', () => { // quando houver um método GET que é de busca
      return [
        {
          id: 1,
          title: 'Transaction 1',
          amount: 400,
          type: 'deposit',
          category: 'Food',
          createAd: new Date()
        }
      ]
    }) */
    
    // rota de criação: que cria uma nova transactions
    // schema é meu banco de dados
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

        // 'transaction' qual o model que eu estou inserindo e o segundo é os dados que eu quero passar pra dentro do meu model
      return schema.create('transaction', data); 
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
