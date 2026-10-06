import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function LoginSignup() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  useEffect(() => {
    function handleMouseMove(event) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSignUp = async () => {
    setErro("");
    setSucesso("");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) {
      setErro("Erro ao criar conta: " + error.message);
    } else {
      setSucesso("Conta criada! Verifique seu email para confirmar.");
      console.log(data);
    }
  };

  const handleLogin = async () => {
    setErro("");
    setSucesso("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErro("Email ou senha incorretos. Verifique seus dados.");
    } else {
      console.log(data);
      navigate("/questionario");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-black">

      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34,197,94,0.2), transparent 40%)`,
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-green-700 opacity-10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-green-900/60 rounded-2xl p-8 shadow-2xl">

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          <span className="text-green-400">TerraMetric</span> Login
        </h1>
        <p className="text-center text-green-700 text-sm mb-8">Acesse sua conta</p>

        <div className="space-y-5">
          <div className="flex items-center bg-black/40 border border-green-900/50 rounded-lg px-4 py-3 focus-within:border-green-500 transition">
            <img src="/conta.png" className="w-5 h-5 mr-3 opacity-50"/>
            <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent outline-none text-white placeholder-green-900" />
          </div>

          <div className="flex items-center bg-black/40 border border-green-900/50 rounded-lg px-4 py-3 focus-within:border-green-500 transition">
            <img src="/e-mail.png" className="w-5 h-5 mr-3 opacity-50"/>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none text-white placeholder-green-900" />
          </div>

          <div className="flex items-center bg-black/40 border border-green-900/50 rounded-lg px-4 py-3 focus-within:border-green-500 transition">
          <img src="/senha.png" className="w-5 h-5 mr-3 opacity-50"/>
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none text-white placeholder-green-900" />
          </div>
        </div>

        {/* Mensagem de erro */}
        {erro && (
          <div className="mt-5 px-4 py-3 rounded-lg bg-red-950/60 border border-red-700 text-red-400 text-sm text-center">
            {erro}
          </div>
        )}

        {/* Mensagem de sucesso */}
        {sucesso && (
          <div className="mt-5 px-4 py-3 rounded-lg bg-green-950/60 border border-green-700 text-green-400 text-sm text-center">
            {sucesso}
          </div>
        )}

        <div className="flex gap-4 mt-6">
          <button onClick={handleSignUp}
            className="flex-1 bg-green-800 hover:bg-green-700 transition py-3 rounded-lg text-white font-semibold border border-green-700">
            Cadastrar-se
          </button>
          <button onClick={handleLogin}
            className="flex-1 bg-green-500 hover:bg-green-400 transition py-3 rounded-lg text-black font-semibold">
            Login-acessar
          </button>
        </div>

      </div>
    </section>
  );
}