import React from 'react';

interface StudentInputProps {
  student: string;
  description: string;
  index: number;
  disabled?: boolean;
  removeStudent: (index: number) => void;
  onChange: (e: React.ChangeEvent<any>) => void;
}


export default function StudentInput({
  index, student, description, disabled, onChange, removeStudent,
}: StudentInputProps) {
  return (
    <>
      <label htmlFor={`student-${index}`}>
        Aluno: {''}
        <input
          type="text"
          id={`student-${index}`}
          name="student-name"
          value={student}
          onChange={onChange}
          placeholder="Nome do aluno"
        />
      </label>
      <label htmlFor={`description-${index}`}>
        Descrição: {''}
        <textarea
          id={`description-${index}`}
          name={`student-description`}
          value={description}
          rows={4}
          cols={50}
          onChange={onChange}
          placeholder="Descrição"
        />
      </label>
      <button
        type="button"
        onClick={() => removeStudent(index)}
        disabled={disabled}
      >
        Remover aluno
      </button>
    </>
  );
}
