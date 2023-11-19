// InputSelect.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bike } from '@/pages/bicicletas';
import { StyledSelect } from './styles';


interface InputSelectProps {
  label: string;
  id: string;
  placeholder?: string;
  width?: number;
  error?: string;
  // Adicione a propriedade clienteId
  bikeId?: string;
  // Adicione a função para lidar com a mudança do cliente
  onBikeChange?: (bikeId: string) => void;
}

const InputSelect: React.FC<InputSelectProps> = ({
  label,
  id,
  placeholder,
  width,
  error,
  bikeId, // Adicione clienteId à desestruturação
  onBikeChange, // Adicione onClienteChange à desestruturação
}) => {
  const [options, setOptions] = useState<Bike[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(bikeId || '');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Bike[]>("http://localhost:3000/bicicletas");
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
    if (onBikeChange) {
      onBikeChange(selectedId);
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
            {option.modelo}
          </option>
        ))}
      </StyledSelect>
      {error && <span>{error}</span>}
    </div>
  );
};

export default InputSelect;
