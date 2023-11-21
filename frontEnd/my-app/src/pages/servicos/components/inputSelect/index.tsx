// InputSelect.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Customer } from '@/pages/clientes';
import { StyledSelect } from './styles';

// Definição das propriedades necessárias para o InputSelect
interface InputSelectProps {
  label: string; // Rótulo do campo de seleção
  id: string; // ID único do campo de seleção
  placeholder?: string; // Texto de placeholder opcional
  width?: number; // Largura do campo de seleção
  error?: string; // Mensagem de erro opcional
  clienteId?: string; // ID do cliente selecionado (opcional)
  onClienteChange?: (clienteId: string) => void; // Função para lidar com a mudança do cliente (opcional)
}

// Componente funcional InputSelect
const InputSelect: React.FC<InputSelectProps> = ({
  label,
  id,
  placeholder,
  width,
  error,
  clienteId,
  onClienteChange,
}) => {
  // Estado para armazenar as opções disponíveis
  const [options, setOptions] = useState<Customer[]>([]);
  // Estado para armazenar a opção selecionada
  const [selectedOption, setSelectedOption] = useState<string | null>(clienteId || '');

  // Efeito para buscar os dados da API ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Customer[]>("http://localhost:3000/clientes");
        setOptions(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  // Função para lidar com a mudança na seleção
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedOption(selectedId);
    // Chame a função de mudança do cliente, se existir
    if (onClienteChange) {
      onClienteChange(selectedId);
    }
  };

  // Renderização do componente
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <StyledSelect
        value={selectedOption || ''} 
        onChange={handleSelectChange}
        width={width || 300} // Utiliza a largura fornecida ou 300 como valor padrão
      >
        <option value="" disabled>
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nome}
          </option>
        ))}
      </StyledSelect>
      {error && <span>{error}</span>}
    </div>
  );
};

export default InputSelect;
