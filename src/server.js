import app from './app';

const porta = process.env.PORT;
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`)
});
