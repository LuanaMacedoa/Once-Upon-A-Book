import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://https://qlmcwtjlfnwofkqfdeoo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbWN3dGpsZm53b2ZrcWZkZW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MTI0MTksImV4cCI6MjA3MTI4ODQxOX0.U2IbZWx_EJwgXRFHUPKElr3B99NALeT4Y_QspnCTbDA'; 
const supabase = createClient(supabaseUrl, supabaseKey);

function FormularioCadastro() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    livroFavorito: ''
  });
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem('');
    const { error } = await supabase
      .from('usuarios')
      .insert([form]);
    if (error) {
      setMensagem('Erro ao cadastrar!');
    } else {
      setMensagem('Cadastro realizado com sucesso!');
      setForm({ nome: '', email: '', livroFavorito: '' });
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
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
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

export default FormularioCadastro;
