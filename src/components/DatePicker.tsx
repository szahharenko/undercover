import React, { useState, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface NativeDateInputProps {
    inputName: string
    minDateValue?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
    className?: string
    required?: boolean
    disableWeekends?: boolean
}

const NativeDateInput: React.FC<NativeDateInputProps> = ({ inputName, minDateValue, value, onChange, className, required, disableWeekends }) => {

  const { t } = useTranslation();

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
    const isWeekend = disableWeekends && (day === 0 || day === 6);

    if (isWeekend) {
      setError(t('form.weekend_error', 'Weekends are not allowed. Please pick a weekday.'));
      setDate('');
    } else {
      setError(null);
      setDate(value);
      onChange(e)
    }
  };

  return (
    <>
        <input
        name={inputName}
        id="weekday-picker"
        type="date"
        value={date}
        min={minDateValue}
        onChange={handleChange}
        className={className}
        required={required}
        style={{
            padding: '8px',
            borderRadius: '4px',
            border: `1px solid ${error ? '#d93025' : '#ccc'}`
        }}
        />
        {error && <p style={{ color: '#d93025', marginTop: '4px' }}>{error}</p>}
    </>
  );
};

export default NativeDateInput;