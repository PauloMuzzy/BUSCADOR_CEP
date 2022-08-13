import {useState} from "react";
import {FiSearch} from "react-icons/fi";
import "./styles.css";
import React from "react"
import api from "./services/api";

export default function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  const handleSearch = async () => {
    if(input.length === "") {
      alert("Digite um CEP");
    }

    try{
      const response = await api.get(`/${input}/json`);
      setCep(response.data);
      console.log(typeof(response.data.complemento));
      setInput("");

    }catch{
      alert("Erro ao buscar CEP");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input 
        type="text" 
        placeholder="Digite o CEP" 
        className="input"
        onChange={(e)=> setInput(e.target.value)}
        value={input}
        />

        <button 
        className="buttonSearch"
        onClick={handleSearch}
        >
          <FiSearch size={25} color={"#FFFFFF"}/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          {(cep.complemento) !== "" && (
            <span>Complemento: {cep.complemento}</span>
          )}
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade} - {cep.uf}</span>
        </main>
      )};
    </div>
  );
}