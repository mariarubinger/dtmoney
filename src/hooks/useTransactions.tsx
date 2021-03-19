import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';

// informar qual o formato
interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionProviderProps {
  children: ReactNode; //aceita qualquer conteúdo válido pro React
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

// vamos passar qual o valor default, ou seja, qual o valor que esse createContext vai iniciar
const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]) // o meu estado armazena um array de transaction
  
  /*   console.log(data); */
  
    // API fictícia
  useEffect(() => {
    api.get('transactions')
      /* .then(response => console.log(response.data)) */
      .then(response => setTransactions(response.data.transactions))
  }, []);


async function createTransaction(transactionInput: TransactionInput) {
  const response = await api.post('/transactions', {
    ...transactionInput,
    createdAt: new Date(),
    
  }) // vou pegar a resposta 
  
  const { transaction } = response.data; // vou receber a transaction dentro do dados do axios;

  //criando uma nova transação mas pegando todas que jé estavam lá
  setTransactions([
    ...transactions,
    transaction,
  ]);
}

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

// criando o nosso hook useTransactions
export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}