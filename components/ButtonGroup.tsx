import React, { useState } from 'react';

interface ButtonGroupProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
  initialValue?: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ options, onSelect, initialValue }) => {
  const [selected, setSelected] = useState<string>(initialValue || options[0]);

  const handleClick = (option: string) => {
    setSelected(option);
    onSelect(option);
  };

  return (
    <div className="button-group">
      {options.map((option) => (
        <button
          key={option}
          className={`button-group__button ${selected === option ? 'button-group__button--selected' : ''}`}
          onClick={() => handleClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;