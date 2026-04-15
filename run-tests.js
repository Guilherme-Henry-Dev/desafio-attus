const { execSync } = require('child_process');
const path = require('path');

try {
  console.log('🚀 Executando testes com Vitest...\n');

  // Executa o Vitest
  execSync('npx vitest run --coverage', {
    stdio: 'inherit',
    cwd: path.join(__dirname)
  });

} catch (error) {
  console.error('❌ Erro ao executar testes:', error.message);
  process.exit(1);
}