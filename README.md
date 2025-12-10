Especificação Técnica: Sistema de Tutor Inteligente com IA

1. Visão Geral da Arquitetura

O sistema segue uma arquitetura MVC (Model-View-Controller) híbrida, onde o Frontend (React) consome uma API RESTful (Node.js). A inteligência do sistema é desacoplada em um micro-serviço de IA (Python) acionado sob demanda.

Fluxo de Dados

Cliente (React): Solicita geração de conteúdo ou dados de dashboard.

Servidor (Node.js):

Valida regras de negócio (ex: cálculo de diagnóstico de aluno).

Gerencia persistência (simulada em memória para este MVP).

Orquestra chamadas ao motor de IA.

Engine IA (Python): Processa prompts complexos e retorna JSON estruturado (Planos de Estudo, Quizzes).

2. Modelagem de Dados (Schema)

2.1 Entidade: Usuário (User)

{
  "id": "uuid",
  "nome": "String",
  "role": "student | teacher",
  "xp": "Integer (Gamificação)",
  "nivel_global": "iniciante | basico | medio | avancado"
}


2.2 Entidade: Desempenho (Performance)

Utilizado para o Radar Chart do aluno.

{
  "aluno_id": "uuid",
  "tema": "String",
  "indicadores": {
    "teorico": 0-100,
    "pratico": 0-100,
    "interpretacao": 0-100,
    "resolucao_problemas": 0-100,
    "engajamento": 0-100
  }
}


2.3 Entidade: Turma (Class)

{
  "id": "uuid",
  "nome": "String",
  "professor_id": "uuid",
  "alunos": ["id_aluno_1", "id_aluno_2"],
  "media_quiz_turma": "Float"
}


3. Lógica de Diagnóstico e Negócio

3.1 Algoritmo de Classificação do Aluno

Implementado no Backend (server.js).

function calcularStatus(mediaQuiz) {
    if (mediaQuiz < 40) return "Necessita Reforço"; // Vermelho
    if (mediaQuiz < 70) return "Aceitável";         // Amarelo
    return "Pronto para Avançar";                   // Verde
}


3.2 Geração de Quiz (Logica de IA)

O prompt para a IA deve solicitar estritamente um JSON.

Entrada: Tema, Nível.

Saída: Array de 15 objetos (5 fáceis, 5 médios, 5 difíceis).

4. Estrutura de APIs (Endpoints)

| Método | Endpoint | Descrição |
|Os endpoints abaixo são implementados no server.js |
|--------|----------|-----------|
| GET | /api/aluno/:id/dashboard | Retorna turmas, radar chart e progresso. |
| POST | /api/professor/turmas | Cria uma nova turma. |
| GET | /api/professor/turmas/:id | Retorna lista de alunos com diagnósticos calculados. |
| POST | /api/ia/plano-estudo | Gera o JSON do plano de estudo baseado no tema. |
| POST | /api/ia/quiz | Gera o quiz de 15 perguntas. |

5. Especificações de Frontend (React)

Lib Gráfica: recharts (para o Radar Chart e gráficos de barra).

Estilização: Tailwind CSS (para layout responsivo e moderno).

Ícones: lucide-react.

Gerenciamento de Estado: useState e useEffect (Hooks nativos).

Mockups Funcionais (Estrutura de Componentes)

StudentDashboard:

Header: XP e Nível atual.

Main: Gráfico de Radar (Habilidades) + Lista de Turmas (Cards).

TeacherDashboard:

Table: Lista de alunos com "badges" de status (Calculados via lógica 3.1).

Actions: Botão de criar turma.

InteractiveClassroom:

Stage 1: Input "O que vamos aprender?".

Stage 2: Renderização do JSON
