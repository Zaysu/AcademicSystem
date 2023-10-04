/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom';
import './styles/main.css';

const baseURL = 'http://localhost:8000';

const App = () => {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Matricula, setMatricula] = useState('');
  const [Email, setEmail] = useState('');
  const [Curso, setCurso] = useState('');
  const [aluno, setAlunos] = useState([]);

  const getAllAlunos = async () => {
    const response = await fetch(`${baseURL}/sistemaacademico/`);

    const data = await response.json();

    if (response.ok) {
      console.log(data);
      setAlunos(data);
    } else {
      console.log('Falha na conexão');
    }
  };

  useEffect(() => {
    getAllAlunos();
  }, []);

  const deleteItem = async (studentId) => {
    const response = await fetch(`${baseURL}/sistemaacademico/${studentId}/`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log(response.statusText);
      getAllAlunos();
    } else {
      console.log('Falha na conexão');
    }
  };

  const criarAluno = async (event) => {
    event.preventDefault();

    const new_request = new Request(`${baseURL}/sistemaacademico/`, {
      body: JSON.stringify({
        StudentId: studentId,
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        Curso: Curso,
        Matricula: Matricula,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const response = await fetch(new_request);
    const data = await response.json();

    if (response.ok) {
      console.log(data);
      getAllAlunos();
    } else {
      console.log('Falha na conexão');
    }
    setStudentId('');
    setFirstName('');
    setLastName('');
    setMatricula('');
    setEmail('');
    setCurso('');
    setModalVisivel(false);
  };

  return (
    <div>
      <div className="header">
        <div className="logo">
          <p className="titulo">Sistema Acadêmico</p>
        </div>
        <div className="adiciona-btn">
          <a className="add-note" href="#" onClick={() => setModalVisivel(true)}>
            Adicionar Aluno
          </a>
        </div>
      </div>
      {aluno.length > 0 ? (
        <div className="notes-list">
          {aluno.map((item) => (
            <div className="note" key={item.studentId}>
              <p>Nome: {item.FirstName}</p>
              <p>Sobrenome: {item.LastName}</p>
              <p>Matrícula: {item.Matricula}</p>
              <p>Email: {item.Email}</p>
              <p>Curso: {item.Curso}</p>
              <a className="delete-button" href="#" onClick={() => deleteItem(item.studentId)}>
              &#10006; - Excluir
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-notes">
          <p className="centerText">Sem Anotações</p>
        </div>
      )}

      <div className={modalVisivel ? 'modal' : 'modal-invisivel'}>
        <div className="form">
          <div className="form-header">
            <p className="form-header-text">Adicione uma Anotação</p>
            <div>
              <a
                className="close-btn"
                href="#"
                onClick={() => setModalVisivel(!modalVisivel)}
              >
                X
              </a>
            </div>
          </div>
          <form action="">
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                name="name"
                id="name"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Sobrenome</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="matricula">Matricula</label>
              <input
                type="number"
                name="matricula"
                id="matricula"
                value={Matricula}
                onChange={(e) => setMatricula(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="curso">Curso</label>
              <input
                type="text"
                name="curso"
                id="curso"
                value={Curso}
                onChange={(e) => setCurso(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Salvar"
                className="btn"
                onClick={criarAluno}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const renderApp = () => {
  const root = createRoot(document.querySelector('#root'));
  root.render(<App />);
};

renderApp();
