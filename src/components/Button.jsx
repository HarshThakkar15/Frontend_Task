import React from 'react';
const Button = ({ children, onClick, primary = false, remove = false, type = 'button', disabled = false, style }) => {
  const baseStyle = {
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.2s, opacity 0.2s',
    border: 'none',
    opacity: disabled ? 0.7 : 1,
  };

  const primaryStyle = {
    backgroundColor: '#5200ff', 
    color: '#fff',
    ...baseStyle,
  };

  const secondaryStyle = {
    backgroundColor: '#f0f0f0',
    color: '#333',
    border: '1px solid #ccc',
    ...baseStyle,
  };
  
  const removeStyle = {
    backgroundColor: '#ff4d4f', 
    color: '#fff',
    padding: '5px 10px',
    marginLeft: '10px',
    fontSize: '0.85rem',
    ...baseStyle,
  };

  const finalStyle = remove ? removeStyle : (primary ? primaryStyle : secondaryStyle);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...finalStyle, ...style }}
    >
      {children}
    </button>
  );
};

export default Button;