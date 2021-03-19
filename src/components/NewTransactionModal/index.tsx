import { FormEvent, useContext, useState } from "react";
import Modal from "react-modal";

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

// pegas as propriedades com o método de desestruturação e passa para as prorpriedades do modal 
export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');  
  const [type, setType] = useState('deposit');
 
  // o formato do event é FormEvent e ele vem do React
 async function handleCreateNewTransaction(event: FormEvent) {
  event.preventDefault();

  await createTransaction({
    title,
    amount,
    category,
    type,
  })

  setTitle('');
  setAmount(0);
  setCategory('');
  setType('deposit');
  onRequestClose(); // caso a função await dê tudo certo, o modal vai fechar
}

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay" // classes de estilização do modal
      className="react-modal-content"
    >

      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />        
      </button>
      
      {/* O Container aqui é o nosso Formulário, por isso ele recebe o onSubmit */}
      <Container onSubmit={handleCreateNewTransaction}>

        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
          value={title}// vamos adicionar a propriedade value apontando para aquele estado
          onChange={event => setTitle(event.target.value)} // event => event.target.value é o valor digitado
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        {/* Botão de entrada e saída do form do modal */}
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => { setType('deposit'); }}
            isActive={type === 'deposit'} // isActive é uma propriedade que eu que dou o nome
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => { setType('withdraw'); }}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
          <img src={outcomeImg} alt="Saída" />
          <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  )
}
