import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle,
  XCircle,
  Trophy,
  User,
  LogOut,
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  Info,
  LogIn,
  LayoutDashboard,
  Brain,
  Lightbulb,
  ArrowRight,
  List,
  GraduationCap,
  School,
  Lock,
  Hash,
  Plus,
  Users,
  CheckSquare,
  Activity,
  Share2,
} from "lucide-react";
import axios from "axios";

// --- CONFIGURAÇÃO DA API ---
// IMPORTANTE: No CodeSandbox, substitua esta URL pela URL da aba "Port 3001" (Server)
// Exemplo: 'https://seu-id-3001.csb.app/api'
const API_URL = "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_URL,
});

// --- ESTILOS GLOBAIS ---
const GlobalStyles = () => (
  <style>{`
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
    
    /* Scrollbar */
    ::-webkit-scrollbar { width: 8px; height: 8px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 4px; }
    .dark ::-webkit-scrollbar-thumb { background-color: #475569; }

    /* Diagrama */
    .diagram-step { position: relative; z-index: 10; }
    .diagram-connector { flex-grow: 1; height: 2px; background-color: #6366f1; margin: 0 10px; position: relative; }
    .diagram-connector::after { content: ''; position: absolute; right: 0; top: -4px; border-top: 5px solid transparent; border-bottom: 5px solid transparent; border-left: 6px solid #6366f1; }
  `}</style>
);

// --- COMPONENTES AUXILIARES ---

const Toast = ({ toasts, removeToast }) => (
  <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
    {toasts.map((t) => (
      <div
        key={t.id}
        className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl animate-fade-in text-white ${
          t.type === "success"
            ? "bg-green-600"
            : t.type === "error"
            ? "bg-red-500"
            : "bg-slate-800"
        }`}
      >
        {t.type === "success" ? <CheckCircle size={18} /> : <Info size={18} />}
        <span className="text-sm font-bold">{t.message}</span>
      </div>
    ))}
  </div>
);

// 1. DASHBOARD VISITANTE (LOGIN) - DEFINIDO FORA PARA EVITAR RE-RENDER
const VisitorDashboard = ({
  loginMode,
  setLoginMode,
  loginData,
  setLoginData,
  handleLogin,
  loading,
}) => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] animate-fade-in p-4">
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden border border-slate-200 dark:border-slate-700">
      {/* Esquerda */}
      <div className="md:w-1/2 bg-indigo-600 p-10 text-white flex flex-col justify-center relative overflow-hidden">
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
            <Brain size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-4">Tutor IA Educatech</h1>
          <p className="text-indigo-100 text-lg leading-relaxed">
            Plataforma de ensino adaptativo. Professores gerenciam, alunos
            aprendem com IA.
          </p>
        </div>
        <Sparkles
          size={250}
          className="absolute -bottom-20 -right-20 text-white opacity-10 animate-pulse"
        />
      </div>

      {/* Direita (Formulário) */}
      <div className="md:w-1/2 p-10 flex flex-col justify-center bg-white dark:bg-slate-800">
        <div className="flex gap-2 mb-8 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setLoginMode("student")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              loginMode === "student"
                ? "bg-white dark:bg-slate-700 shadow text-indigo-600"
                : "text-slate-500"
            }`}
          >
            Sou Aluno
          </button>
          <button
            type="button"
            onClick={() => setLoginMode("teacher")}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              loginMode === "teacher"
                ? "bg-white dark:bg-slate-700 shadow text-indigo-600"
                : "text-slate-500"
            }`}
          >
            Sou Professor
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {loginMode === "student" ? (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                  Nome
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-3 text-slate-400"
                    size={18}
                  />
                  <input
                    className="w-full pl-10 p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                    placeholder="Seu Nome"
                    value={loginData.name}
                    onChange={(e) =>
                      setLoginData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                  Código da Turma
                </label>
                <div className="relative">
                  <Hash
                    className="absolute left-3 top-3 text-slate-400"
                    size={18}
                  />
                  <input
                    className="w-full pl-10 p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-indigo-500 uppercase dark:text-white"
                    placeholder="Ex: T101"
                    value={loginData.code}
                    onChange={(e) =>
                      setLoginData((prev) => ({
                        ...prev,
                        code: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                  Usuário
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-3 text-slate-400"
                    size={18}
                  />
                  <input
                    className="w-full pl-10 p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                    placeholder="admin"
                    value={loginData.username}
                    onChange={(e) =>
                      setLoginData((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                  Senha
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-3 text-slate-400"
                    size={18}
                  />
                  <input
                    type="password"
                    className="w-full pl-10 p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                    placeholder="••••"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            {loading ? (
              <Activity className="animate-spin" />
            ) : (
              "Entrar na Plataforma"
            )}
          </button>
        </form>
      </div>
    </div>
  </div>
);

// 2. DASHBOARD ALUNO
const StudentDashboard = ({ user, setActiveTab }) => (
  <div className="space-y-8 animate-fade-in">
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
      <div>
        <h2 className="text-3xl font-bold">Olá, {user.name}!</h2>
        <p className="opacity-90 mt-2 max-w-lg">
          Você está matriculado na turma{" "}
          <span className="font-mono bg-white/20 px-2 py-0.5 rounded text-sm">
            {user.classCode || "Geral"}
          </span>
          .
        </p>
      </div>
      <div className="flex gap-4">
        <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl text-center min-w-[100px]">
          <span className="block text-3xl font-bold">{user.level}</span>
          <span className="text-xs uppercase font-bold opacity-80">Nível</span>
        </div>
        <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl text-center min-w-[100px]">
          <span className="block text-3xl font-bold">{user.xp}</span>
          <span className="text-xs uppercase font-bold opacity-80">XP</span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        onClick={() => setActiveTab("classroom")}
        className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all group"
      >
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Brain size={24} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
          Acessar Tutor IA
        </h3>
        <p className="text-slate-500 mb-6">
          Tire dúvidas, gere resumos e faça quizzes personalizados sobre
          qualquer tema.
        </p>
        <span className="text-indigo-600 font-bold flex items-center gap-2">
          Ir para Sala de Aula <ArrowRight size={16} />
        </span>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
          <Trophy size={24} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
          Próxima Conquista
        </h3>
        <p className="text-slate-500 mb-4">
          Complete mais 3 quizzes para alcançar o Nível {user.level + 1}.
        </p>
        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-green-500 h-full rounded-full"
            style={{ width: "65%" }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);

// 3. DASHBOARD PROFESSOR
const TeacherDashboard = ({ teacherClasses, handleCreateClass }) => (
  <div className="space-y-8 animate-fade-in">
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-white shadow-xl flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold">Painel do Educador</h2>
        <p className="opacity-90 mt-2">
          Gerencie suas turmas e acompanhe o desempenho com IA.
        </p>
      </div>
      <button
        onClick={handleCreateClass}
        className="bg-white text-teal-700 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-teal-50 transition-colors flex items-center gap-2"
      >
        <Plus size={20} /> Criar Turma
      </button>
    </div>

    <div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
        <School className="text-teal-600" /> Turmas Ativas
      </h3>

      {teacherClasses.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-slate-400">
          Você ainda não criou nenhuma turma.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teacherClasses.map((cls, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 border-l-4 border-l-teal-500"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-lg text-slate-800 dark:text-white">
                    {cls.name}
                  </h4>
                  <span className="text-xs font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-500">
                    CÓD: {cls.id}
                  </span>
                </div>
                <Users className="text-slate-300" />
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700">
                <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                  {cls.students} Alunos
                </span>
                <button className="text-teal-600 text-sm font-bold hover:underline">
                  Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

// 4. SALA DE AULA IA
const TutorClassroom = ({
  tutorInput,
  setTutorInput,
  handleAskTutor,
  loading,
  tutorContent,
}) => (
  <div className="space-y-8 animate-fade-in">
    {/* Caixa de Entrada */}
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-indigo-100 dark:border-indigo-900/30">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-indigo-600 text-white p-2 rounded-lg">
          <Brain size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            O que vamos aprender hoje?
          </h2>
          <p className="text-slate-500 text-sm">
            A IA gerará uma aula completa com explicação, exemplos e quiz.
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <input
          value={tutorInput}
          onChange={(e) => setTutorInput(e.target.value)}
          className="flex-1 p-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-lg"
          placeholder="Digite um tema (ex: Leis de Newton, Python, Marketing Digital...)"
        />
        <button
          onClick={handleAskTutor}
          disabled={loading}
          className="bg-indigo-600 text-white px-8 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center"
        >
          {loading ? (
            <Activity className="animate-spin" />
          ) : (
            <ArrowRight size={24} />
          )}
        </button>
      </div>
    </div>

    {/* Conteúdo Gerado */}
    {tutorContent && (
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border-l-4 border-l-blue-500">
          <h3 className="text-lg font-bold text-blue-600 mb-3 flex items-center gap-2">
            <BookOpen size={20} /> Explicação Simplificada
          </h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
            {tutorContent.block1_explanation}
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/10 p-8 rounded-2xl border border-amber-200 dark:border-amber-800/30">
          <h3 className="text-lg font-bold text-amber-700 dark:text-amber-500 mb-2 flex items-center gap-2">
            <Lightbulb size={20} /> Exemplo Prático
          </h3>
          <h4 className="font-bold text-slate-800 dark:text-white mb-2">
            {tutorContent.block2_example.title}
          </h4>
          <p className="text-slate-700 dark:text-slate-300">
            {tutorContent.block2_example.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <List className="text-indigo-500" /> Pontos Chave
            </h3>
            <ul className="space-y-3">
              {tutorContent.block3_summary.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-slate-600 dark:text-slate-300 text-sm"
                >
                  <span className="bg-indigo-100 text-indigo-600 font-bold text-xs px-2 py-0.5 rounded-full shrink-0">
                    {i + 1}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col justify-center">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Share2 className="text-purple-500" /> Fluxo do Conceito
            </h3>
            <div className="flex items-center justify-between px-2">
              {tutorContent.block7_diagram.steps.map((step, i, arr) => (
                <React.Fragment key={i}>
                  <div className="diagram-step bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 dark:text-white shadow-sm border border-slate-200 dark:border-slate-600 text-center z-10">
                    {step}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="diagram-connector"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border-t-4 border-t-indigo-500">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
            <CheckSquare className="text-indigo-500" /> Quiz de Fixação
          </h3>
          <div className="grid grid-cols-1 gap-6">
            {tutorContent.block4_quiz.map((q, qIdx) => (
              <div
                key={q.id}
                className="p-5 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700"
              >
                <p className="font-bold text-slate-800 dark:text-white mb-4">
                  {qIdx + 1}. {q.q}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      className="text-left px-4 py-3 bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 rounded-lg text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200 transition-colors"
                    >
                      <span className="font-bold text-slate-400 mr-2">
                        {String.fromCharCode(65 + oIdx)})
                      </span>{" "}
                      {opt}
                    </button>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg text-sm text-green-700 dark:text-green-300 flex gap-2">
                  <CheckCircle size={16} className="shrink-0 mt-0.5" />
                  <span>
                    <strong>Gabarito:</strong>{" "}
                    {tutorContent.block5_feedback[qIdx]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-900 p-8 rounded-2xl text-white flex flex-col md:flex-row items-center gap-6">
          <div className="p-4 bg-white/10 rounded-full">
            <Sparkles size={32} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-3">
              Próximos Passos & Sugestões
            </h3>
            <div className="flex flex-wrap gap-3">
              {tutorContent.block6_study_suggestions.map((sug, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-black/20 rounded-lg text-sm hover:bg-black/40 transition-colors cursor-default border border-white/10"
                >
                  {sug}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

// --- COMPONENTE PRINCIPAL (MAIN) ---
const AISTUDYTECDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Estados de Dados
  const [user, setUser] = useState({
    name: "Visitante",
    role: "visitor",
    classes: [],
  });
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [tutorInput, setTutorInput] = useState("");
  const [tutorContent, setTutorContent] = useState(null);

  // Login
  const [loginMode, setLoginMode] = useState("student");
  const [loginData, setLoginData] = useState({
    name: "",
    code: "",
    username: "",
    password: "",
  });

  const addToast = (msg, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message: msg, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      4000
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload =
        loginMode === "student"
          ? {
              type: "student",
              credential: { name: loginData.name, code: loginData.code },
            }
          : {
              type: "teacher",
              credential: {
                username: loginData.username,
                password: loginData.password,
              },
            };

      const res = await api.post("/login", payload);

      setUser(res.data.user);
      if (res.data.user.role === "teacher") {
        const classesRes = await api.get("/classes");
        setTeacherClasses(classesRes.data);
      }

      addToast(`Bem-vindo, ${res.data.user.name}!`, "success");
      setActiveTab("dashboard");
    } catch (error) {
      console.error(error);
      addToast("Erro na conexão (Verifique a URL da API)", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAskTutor = async () => {
    if (!tutorInput.trim()) return addToast("Digite um tema", "error");
    setLoading(true);
    setTutorContent(null);
    try {
      const res = await api.post("/tutor", { topic: tutorInput });
      setTutorContent(res.data);
      addToast("Aula gerada!", "success");
    } catch (error) {
      addToast("Erro ao gerar aula", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClass = async () => {
    const name = prompt("Nome da turma:");
    if (!name) return;
    try {
      const res = await api.post("/classes", { name, teacher: user.name });
      setTeacherClasses((prev) => [...prev, res.data]);
      addToast("Turma criada", "success");
    } catch (e) {
      addToast("Erro ao criar turma", "error");
    }
  };

  const handleLogout = () => {
    setUser({ name: "Visitante", role: "visitor" });
    setActiveTab("home");
    setTutorContent(null);
    setLoginData({ name: "", code: "", username: "", password: "" });
  };

  const SidebarItem = ({ id, icon: Icon, label, roles }) => {
    if (roles && !roles.includes(user.role)) return null;
    return (
      <button
        onClick={() => {
          setActiveTab(id);
          setSidebarOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
          activeTab === id
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
            : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        }`}
      >
        <Icon size={20} /> <span>{label}</span>
      </button>
    );
  };

  return (
    <div
      className={`flex h-screen w-full bg-slate-50 dark:bg-slate-900 font-sans overflow-hidden ${
        darkMode ? "dark" : ""
      }`}
    >
      <GlobalStyles />
      <Toast
        toasts={toasts}
        removeToast={(id) =>
          setToasts((prev) => prev.filter((t) => t.id !== id))
        }
      />

      {/* OVERLAY MOBILE */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      {user.role !== "visitor" && (
        <aside
          className={`
          fixed md:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 
          transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl md:shadow-none
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
        `}
        >
          <div className="p-6 h-16 flex items-center gap-3 border-b border-slate-100 dark:border-slate-700">
            <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-lg">
              <Brain size={20} />
            </div>
            <h1 className="font-bold text-xl text-slate-800 dark:text-white tracking-tight">
              AISTUDY
            </h1>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <SidebarItem
              id="dashboard"
              icon={LayoutDashboard}
              label="Visão Geral"
              roles={["student", "teacher"]}
            />
            <SidebarItem
              id="classroom"
              icon={BookOpen}
              label="Sala de Aula IA"
              roles={["student", "teacher"]}
            />
            <div className="pt-4 pb-2 text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
              Gestão
            </div>
            <SidebarItem
              id="my-classes"
              icon={Users}
              label="Minhas Turmas"
              roles={["student"]}
            />
            <SidebarItem
              id="manage-classes"
              icon={School}
              label="Gestão de Turmas"
              roles={["teacher"]}
            />
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 truncate capitalize">
                  {user.role === "teacher" ? "Professor" : "Aluno"}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium text-sm"
            >
              <LogOut size={16} /> Sair
            </button>
          </div>
        </aside>
      )}

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-3">
            {user.role !== "visitor" && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 text-slate-600 dark:text-white rounded-lg hover:bg-slate-100"
              >
                <Menu size={24} />
              </button>
            )}
            <h2 className="text-lg font-bold text-slate-800 dark:text-white truncate ml-2">
              {activeTab === "home" && "Bem-vindo"}
              {activeTab === "dashboard" && "Painel de Controle"}
              {activeTab === "classroom" && "Sala de Aula Inteligente"}
            </h2>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-yellow-400 transition-colors"
          >
            <Sun size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50 dark:bg-slate-900 scroll-smooth">
          <div className="max-w-6xl mx-auto pb-20">
            {activeTab === "home" && (
              <VisitorDashboard
                loginMode={loginMode}
                setLoginMode={setLoginMode}
                loginData={loginData}
                setLoginData={setLoginData}
                handleLogin={handleLogin}
                loading={loading}
              />
            )}
            {activeTab === "dashboard" && user.role === "student" && (
              <StudentDashboard user={user} setActiveTab={setActiveTab} />
            )}
            {activeTab === "dashboard" && user.role === "teacher" && (
              <TeacherDashboard
                teacherClasses={teacherClasses}
                handleCreateClass={handleCreateClass}
              />
            )}
            {activeTab === "classroom" && (
              <TutorClassroom
                tutorInput={tutorInput}
                setTutorInput={setTutorInput}
                handleAskTutor={handleAskTutor}
                loading={loading}
                tutorContent={tutorContent}
              />
            )}
            {(activeTab === "my-classes" || activeTab === "manage-classes") && (
              <div className="text-center py-20 text-slate-400 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">
                Funcionalidade de detalhe de turmas em desenvolvimento.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AISTUDYTECDashboard;
