// InputSelect.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Item } from '@/pages/itens';
import { StyledSelect } from './styles';


interface InputSelectProps {
  label: string;
  id: string;
  placeholder?: string;
  width?: number;
  error?: string;
  // Adicione a propriedade clienteId
  itemId?: string;
  // Adicione a função para lidar com a mudança do cliente
  onItemChange?: (itemId: string) => void;
}

const InputSelect: React.FC<InputSelectProps> = ({
  label,
  id,
  placeholder,
  width,
  error,
  itemId, // Adicione clienteId à desestruturação
  onItemChange, // Adicione onClienteChange à desestruturação
}) => {
  const [options, setOptions] = useState<Item[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(itemId || '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Item[]>("http://localhost:3000/itens");
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
    if (onItemChange) {
      onItemChange(selectedId);
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
