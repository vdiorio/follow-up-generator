import type {NextPage} from 'next';
import Head from 'next/head';
import React, {ChangeEvent, useState} from 'react';
import StudentInput from '../components/StudentInput';
import generate from '../helpers/followUpGenerator';
import styles from '../styles/Home.module.css';


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
    setStudents(students.filter((_, i) => i !== index));
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
    <div className={styles.container}>
      <Head>
        <title>Follow-up Generator</title>
        <meta
          name="description"
          content="Gerador de follow ups para summers de instrução da TRYBE"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>Follow-up Generator</h1>
      </header>

      <main className={styles.main}>
        <form className={styles.form}>
          <label htmlFor="date">
            Data: {''}
            <input
              name="date"
              type="date"
              id="date"
              value={date}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="inicio">
            Início: {''}
            <input
              name='inicio'
              type="time"
              id="inicio"
              value={inicio}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="fim">
            Fim: {''}
            <input
              name='fim'
              type="time"
              id="fim"
              value={fim}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="engagement">
            Engajamento: {''}
            <input
              type="number"
              id="engagement"
              name="engagement"
              value={engagement}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="summary">
            Resumo: {''}
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
            <button
              type="button"
              onClick={() => setStudents([...students, newStudent])}
            >
              Adicionar aluno
            </button>
          </label>
          <label htmlFor="positive">
            Pontos Positivos: {''}
            <textarea
              id="positive"
              name="positive"
              value={positive}
              placeholder="SEPARE AS ENTRADAS COM *PONTO E VÍRGULA* ;"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="bestory">
            Pontos de Melhoria: {''}
            <textarea
              id="melhorias"
              name="bestory"
              value={bestory}
              placeholder="SEPARE AS ENTRADAS COM *PONTO E VÍRGULA* ;"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="atention">
            Pontos de Atenção: {''}
            <textarea
              id="atenção"
              name="atention"
              value={atention}
              placeholder="SEPARE AS ENTRADAS COM *PONTO E VÍRGULA* ;"
              onChange={handleChange}
            />
          </label>
        </form>
        <div>
          <h1>Preview do Follow-up</h1>
          <textarea
            readOnly
            rows={35}
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
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Feito por: Vitor Martins Diorio
        </a>
      </footer>
    </div>
  );
};

export default Home;
