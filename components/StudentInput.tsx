import {CloseIcon} from '@chakra-ui/icons';
import {
  Input, Textarea, Button, AccordionItem,
  AccordionButton, Box, AccordionPanel, AccordionIcon,
} from '@chakra-ui/react';
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
    <AccordionItem>
      { ({isExpanded}) => (
        <>
          <h2>
            <AccordionButton
              _hover={{bg: 'rgba(200,255,159,0.01)'}}
              _expanded={{bg: 'rgba(250,230,165,0.1)'}}
            >
              <Box flex='1' textAlign='left' fontWeight="bold">
                {student || `Estudante ${index + 1}`}
              </Box>
              <h2>
                <AccordionIcon />
              </h2>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} bg='rgba(256,256,256,0.01)'>
            <label htmlFor={`student-${index}`}>
              Estudante: {''}
              <Input
                type="text"
                id={`student-${index}`}
                name="student-name"
                value={student}
                onChange={onChange}
                placeholder="Nome do estudante" />
            </label>
            <label htmlFor={`description-${index}`}>
              Descrição: {''}
              <Textarea
                id={`description-${index}`}
                name={`student-description`}
                value={description}
                rows={4}
                cols={50}
                onChange={onChange}
                placeholder="Descrição" />
            </label>
            <Button
              type="button"
              colorScheme="red"
              m="1rem"
              float="right"
              size="sm"
              gap="0.5rem"
              variant="outline"
              leftIcon={<CloseIcon />}
              onClick={() => removeStudent(index)}
              disabled={disabled}
            >
              Remover estudante
            </Button>
          </AccordionPanel>
        </>
      ) }
    </AccordionItem>
  );
}
