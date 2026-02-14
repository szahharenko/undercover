import React, { useState, type ChangeEvent } from 'react';

interface NativeDateInputProps {
    name: string
    min?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
    className?: string
    required?: boolean
}

const NativeDateInput: React.FC = (props : NativeDateInputProps) => {

  const { name, min, value, onChange, className, required } = props
  // State is either a string (YYYY-MM-DD) or an empty string
  const [date, setDate] = useState<string>(value);
  const [error, setError] = useState<string | null>(null);


  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    // If user clears the input, value will be an empty string
    if (!value) {
      setDate('');
      setError(null);
      return;
    }

    // Use UTC to avoid timezone shifts jumping to the previous day
    const selectedDate = new Date(value);
    const day = selectedDate.getUTCDay();

    // 0 = Sunday, 6 = Saturday
    const isWeekend = day === 0 || day === 6;

    if (isWeekend) {
      setError('Weekends are not allowed. Please pick a weekday.');
      setDate('');
    } else {
      setError(null);
      setDate(value);
      onChange(e)
    }
  };

  return (
    <input
    name={name}
    id="weekday-picker"
    type="date"
    value={date}
    min={min}
    onChange={handleChange}
    className={className}
    required={required}
    style={{
        padding: '8px',
        borderRadius: '4px',
        border: `1px solid ${error ? '#d93025' : '#ccc'}`
    }}
    />
  );
};

export default NativeDateInput;