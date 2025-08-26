import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://https://qlmcwtjlfnwofkqfdeoo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbWN3dGpsZm53b2ZrcWZkZW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MTI0MTksImV4cCI6MjA3MTI4ODQxOX0.U2IbZWx_EJwgXRFHUPKElr3B99NALeT4Y_QspnCTbDA'; 
const supabase = createClient(supabaseUrl, supabaseKey);

// Componente para exibir lista de usuários cadastrados
function ListaUsuarios({ usuarios }) {
  return (
    <div>
      <h3>Usuários Cadastrados: {usuarios.length}</h3>
      {usuarios.length > 0 && (
        <ul>
          {usuarios.slice(-3).map((usuario, index) => (
            <li key={index}>
              {usuario.nome} - {usuario.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FormularioCadastro({ adicionarUsuario }) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    livroFavorito: ''
  });
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarCampos = () => {
    const novosErros = {};
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      novosErros.email = 'Email inválido';
    }
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarCampos()) {
      setMensagem('Por favor, corrija os erros no formulário');
      return;
    }
    
    setCarregando(true);
    setMensagem('');
    const { error } = await supabase
      .from('usuarios')
      .insert([form]);
    if (error) {
      setMensagem('Erro ao cadastrar!');
    } else {
      setMensagem('Cadastro realizado com sucesso!');
      adicionarUsuario(form); // Comunica com componente pai
      setForm({ nome: '', email: '', livroFavorito: '' });
      setErros({});
    }
    setCarregando(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
        required
      />
      {erros.nome && <p style={{color: 'red'}}>{erros.nome}</p>}
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      {erros.email && <p style={{color: 'red'}}>{erros.email}</p>}
      <input
        name="livroFavorito"
        placeholder="Livro Favorito"
        value={form.livroFavorito}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={carregando}>{carregando ? 'Cadastrando...' : 'Cadastrar'}</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
}

// Componente principal que gerencia estado entre componentes
function App() {
  const [usuarios, setUsuarios] = useState([]);

  const adicionarUsuario = (novoUsuario) => {
    setUsuarios([...usuarios, novoUsuario]);
  };

  return (
    <div>
      <ListaUsuarios usuarios={usuarios} />
      <FormularioCadastro adicionarUsuario={adicionarUsuario} />
    </div>
  );
}

export default App;
