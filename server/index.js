const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// --- DADOS EM MEMÓRIA (Simulando Banco de Dados) ---
let classes = [
  {
    id: "T101",
    name: "Introdução à Informática",
    teacher: "Prof. Xavier",
    students: 12,
  },
  {
    id: "T102",
    name: "Física Quântica Básica",
    teacher: "Prof. Einstein",
    students: 5,
  },
];

// --- MOTOR DE "IA" SIMULADO (Gera a estrutura exata do seu prompt) ---
// Em produção, você substituiria isso por uma chamada real à API do Gemini
const generateTutorContent = (topic) => {
  return {
    block1_explanation: `A **${topic}** é um conceito fundamental na área de estudo selecionada. Essencialmente, refere-se ao processo ou sistema que permite a estruturação e compreensão de dados complexos de forma lógica.`,
    block2_example: {
      title: "Aplicação no Mundo Real",
      description: `Imagine uma fábrica de automóveis. O conceito de ${topic} seria análogo à linha de montagem, onde cada peça se encaixa em uma ordem específica para garantir o funcionamento do veículo.`,
    },
    block3_summary: [
      `Definição central de ${topic}.`,
      "Importância na indústria moderna.",
      "Relação com outros conceitos técnicos.",
      "Principais erros de interpretação.",
      "Tendências futuras.",
    ],
    block4_quiz: [
      {
        id: 1,
        q: `Qual o principal objetivo de ${topic}?`,
        options: [
          "Otimizar processos",
          "Gerar caos",
          "Reduzir qualidade",
          "Nenhuma das anteriores",
        ],
        ans: 0,
      },
      {
        id: 2,
        q: `Quem utiliza ${topic} frequentemente?`,
        options: [
          "Padeiros",
          "Engenheiros/Técnicos",
          "Artistas plásticos",
          "Músicos",
        ],
        ans: 1,
      },
      {
        id: 3,
        q: `A ${topic} é considerada:`,
        options: ["Obsoleta", "Essencial", "Irrelevante", "Perigosa"],
        ans: 1,
      },
      {
        id: 4,
        q: `Em qual contexto ${topic} falha?`,
        options: [
          "Sem planejamento",
          "Com excesso de recursos",
          "Em ambientes controlados",
          "Nunca falha",
        ],
        ans: 0,
      },
      {
        id: 5,
        q: `O futuro de ${topic} envolve:`,
        options: ["Automação", "Desuso", "Proibição", "Estagnação"],
        ans: 0,
      },
    ],
    block5_feedback: [
      "Correta: Otimização é a chave. As outras opções descrevem o oposto do objetivo.",
      "Correta: Profissionais técnicos dependem disso para precisão.",
      "Correta: Sem isso, sistemas complexos colapsam.",
      "Correta: O planejamento é pré-requisito obrigatório.",
      "Correta: A IA e automação estão expandindo este conceito.",
    ],
    block6_study_suggestions: [
      "Revisar o capítulo 4 do livro base.",
      "Praticar com exercícios de fixação nº 2.",
      "Assistir ao vídeo 'O Futuro de " + topic + "'.",
      "Criar um mapa mental sobre o tema.",
    ],
    block7_diagram: {
      type: "fluxogram",
      steps: [
        "Entrada",
        "Processamento (" + topic + ")",
        "Verificação",
        "Saída",
      ],
    },
  };
};

// --- ROTAS ---

// Login (Simulado)
app.post("/api/login", (req, res) => {
  const { type, credential } = req.body;
  // Lógica simplificada para demo
  if (type === "student") {
    res.json({
      user: {
        name: credential.name,
        role: "student",
        level: 2,
        xp: 450,
        classCode: credential.code,
      },
    });
  } else {
    res.json({
      user: {
        name: credential.username,
        role: "teacher",
        classesManaged: classes,
      },
    });
  }
});

// Tutor IA
app.post("/api/tutor", (req, res) => {
  const { topic } = req.body;
  // Simula delay de processamento da IA
  setTimeout(() => {
    const content = generateTutorContent(topic);
    res.json(content);
  }, 2000);
});

// Gestão de Turmas (Professor)
app.post("/api/classes", (req, res) => {
  const { name, teacher } = req.body;
  const newClass = {
    id: "T" + Math.floor(Math.random() * 1000),
    name,
    teacher,
    students: 0,
  };
  classes.push(newClass);
  res.json(newClass);
});

app.get("/api/classes", (req, res) => {
  res.json(classes);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
