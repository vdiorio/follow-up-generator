import {AddIcon} from '@chakra-ui/icons';
import {
  Accordion,
  Box,
  Button, chakra, FormLabel, Heading, Input, Textarea,
} from '@chakra-ui/react';
import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, {ChangeEvent, useState} from 'react';
import StudentInput from '../components/StudentInput';
import generate from '../helpers/followUpGenerator';
import image from '../public/followup.png';


const newStudent = {student: '', description: ''};

const Home: NextPage = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [inicio, setInicio] = useState('09:00');
  const [fim, setFim] = useState('13:00');
  const [engagement, setEngagement] = useState(0);
  const [positive, setPositive] = useState('');
  const [atention, setAtention] = useState('');
  const [bestory, setBestory] = useState('');
  const [students, setStudents] = useState([{
    student: '',
    description: '',
  }]);

  const removeStudent = (index: number) => {
    console.log(students);
    const filteredState = students.filter((_, i) => i !== index);
    console.log(filteredState);
    setStudents(filteredState);
  };

  const handleChange = ({target: {name, value, id}}: ChangeEvent<any>) => {
    switch (name) {
      case 'date':
        console.log(value);
        setDate(value);
        break;
      case 'inicio':
        setInicio(value);
        console.log(value);
        break;
      case 'fim':
        setFim(value);
        break;
      case 'engagement':
        setEngagement(value);
        break;
      case 'student-name':
        const index = Number(id.split('-')[1]);
        setStudents(students.map((student, i) => {
          return (i === index ? {...student, student: value} : student);
        }));
        break;
      case 'student-description':
        const index2 = Number(id.split('-')[1]);
        setStudents(students.map((student, i) => {
          return (i === index2 ? {...student, description: value} : student);
        }));
        break;
      case 'positive':
        console.log(value);
        setPositive(value);
        break;
      case 'atention':
        setAtention(value);
        break;
      case 'bestory':
        setBestory(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Head>
        <title>Follow-up Generator</title>
        <meta
          name="description"
          content="Gerador de follow ups para summers de instrução da TRYBE"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading
        textAlign="center"
        padding="3vh"
        mb="3vh"
        borderBottom="solid 1px lightgray"
      >
        <h1>Gerador de follow-up</h1>
      </Heading>

      <chakra.main
        maxWidth="100%"
        padding="0 10rem"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <chakra.form
          width="50%"
          display="flex"
          flexDir="column"
        >
          <chakra.div
            display="flex"
            w="100%"
            flexWrap="wrap"
            gap="1rem"
          >
            <FormLabel htmlFor="date">
            Data: {''}
              <Input
                w="150px"
                name="date"
                type="date"
                id="date"
                value={date}
                onChange={handleChange}
              />
            </FormLabel>
            <FormLabel htmlFor="inicio">
            Início: {''}
              <Input
                w="120px"
                name='inicio'
                type="time"
                id="inicio"
                value={inicio}
                onChange={handleChange}
              />
            </FormLabel>
            <FormLabel htmlFor="fim">
            Fim: {''}
              <Input
                w="120px"
                name='fim'
                type="time"
                id="fim"
                value={fim}
                onChange={handleChange}
              />
            </FormLabel>
          </chakra.div>
          <FormLabel htmlFor="engagement">
            Engajamento: {''}
            <Input
              w="65px"
              type="number"
              id="engagement"
              name="engagement"
              value={engagement}
              onChange={handleChange}
            />
          </FormLabel>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
                Resumo: {''}
            <Button
              type="button"
              colorScheme="green"
              float="right"
              margin="1rem"
              size="sm"
              variant="outline"
              leftIcon={<AddIcon />}
              onClick={() => {
                setStudents([...students, newStudent]);
              }}
              disabled={students[students.length - 1]!.student.length < 3}
            >
              Add Estudante
            </Button>
          </Box>
          <FormLabel>
            <Accordion allowToggle>
              { students.map(({student, description}, i) => (
                <StudentInput
                  key={i}
                  student={student}
                  description={description}
                  onChange={handleChange}
                  removeStudent={removeStudent}
                  index={i}
                  disabled={students.length === 1}
                />
              )) }
            </Accordion>
          </FormLabel>
          <FormLabel htmlFor="positive">
            Pontos Positivos: {''}
            <Textarea
              id="positive"
              name="positive"
              value={positive}
              placeholder="Itens são separados por quebra de linha"
              onChange={handleChange}
            />
          </FormLabel>
          <FormLabel htmlFor="bestory">
            Pontos de Melhoria: {''}
            <Textarea
              id="melhorias"
              name="bestory"
              value={bestory}
              placeholder="Itens são separados por quebra de linha"
              onChange={handleChange}
            />
          </FormLabel>
          <FormLabel htmlFor="atention">
            Pontos de Atenção: {''}
            <Textarea
              id="atenção"
              name="atention"
              value={atention}
              placeholder="Itens são separados por quebra de linha"
              onChange={handleChange}
            />
          </FormLabel>
        </chakra.form>
        <div>
          <h1>Preview do Follow-up</h1>
          <Textarea
            readOnly
            rows={25}
            cols={50}
            value={generate({
              date,
              inicio,
              fim,
              engagement,
              students: students.filter(({student, description}) => {
                return student !== '' || description !== '';
              }),
              positive,
              bestory,
              atention,
            })}
          />
          <Box
            padding="1rem"
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            gap="1rem"
            alignItems="center"
          >
            <p style={{fontWeight: 'bold'}}>
              <span style={{color: 'red'}}>{'** ATENÇÃO ** '}</span>
              Ao colar no slack, aplique a formatação de texto
            </p>
            <Image src={image} style={{float: 'right'}} />
          </Box>
        </div>
      </chakra.main>

      <chakra.footer
        borderTop="solid 1px lightgray"
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding="1rem"
        marginTop="2rem"
      >
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Feito por: Vitor Martins Diorio
        </a>
      </chakra.footer>
    </div>
  );
};

export default Home;
