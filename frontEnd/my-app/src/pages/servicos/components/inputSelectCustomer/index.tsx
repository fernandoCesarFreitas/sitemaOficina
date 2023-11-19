// InputSelect.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Customer } from '@/pages/clientes';
import { StyledSelect } from './styles';


interface InputSelectProps {
  label: string;
  id: string;
  placeholder?: string;
  width?: number;
  error?: string;
  // Adicione a propriedade clienteId
  clienteId?: string;
  // Adicione a função para lidar com a mudança do cliente
  onClienteChange?: (clienteId: string) => void;
}

const InputSelect: React.FC<InputSelectProps> = ({
  label,
  id,
  placeholder,
  width,
  error,
  clienteId, // Adicione clienteId à desestruturação
  onClienteChange, // Adicione onClienteChange à desestruturação
}) => {
  const [options, setOptions] = useState<Customer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(clienteId || '');

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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedOption(selectedId);
    // Chame a função de mudança do cliente, se existir
    if (onClienteChange) {
      onClienteChange(selectedId);
    }
  };

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <StyledSelect
        value={selectedOption || ''} 
        onChange={handleSelectChange}
        width={300}
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
