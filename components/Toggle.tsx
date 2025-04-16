import React, { useState } from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

const Toggle: React.FC<ToggleProps> = ({ checked: initialChecked, onChange, label }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <div className="toggle-container">
      {label && <label htmlFor="toggle" className="toggle-label">{label}</label>}
      <label className="switch">
        <input
          type="checkbox"
          id="toggle"
          checked={isChecked}
          onChange={handleChange}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Toggle;