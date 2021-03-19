import logoImg from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
  onOpenNewTransactionModal: () => void; // essa propriedade é uma função e o retorno é vazio, não recebe nenhum parâmetro e e não recebe nenhum retorno 
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type="button" onClick={onOpenNewTransactionModal}>
        Nova transação
      </button>
      </Content>
    </Container>
  )
}