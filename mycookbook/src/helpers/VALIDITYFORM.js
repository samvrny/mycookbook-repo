import { useState } from 'react';

function MyForm() {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setError(''); // clear error on typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setError('Please enter something (not just spaces).');
    } else {
      setError('');
      alert('Form submitted successfully!');
      // proceed with your submit logic here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter something"
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;