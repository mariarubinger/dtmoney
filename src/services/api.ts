import axios from 'axios';

// vou criar uma instância do Axios, pra setar algumas informações que são padrão pra todas as requisições que vamos fazer pra nossa API
export const api = axios.create({ 
  baseURL: 'https://dtmoney-rust.vercel.app/api',
  
  //baseURL: 'http://localhost:3000/api',///o endereço que se repete em todas as requisições
})