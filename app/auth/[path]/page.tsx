import { AuthView } from "@neondatabase/auth/react";
import Image from "next/image";
import Link from "next/link";

export const dynamicParams = false;

const ptBR = {
  SIGN_IN: "Entrar",
  SIGN_IN_ACTION: "Entrar",
  SIGN_IN_DESCRIPTION: "Digite seu e-mail abaixo para acessar sua conta",
  SIGN_IN_WITH: "Entrar com",
  SIGN_OUT: "Sair",
  SIGN_UP: "Criar conta",
  SIGN_UP_ACTION: "Criar conta",
  SIGN_UP_DESCRIPTION: "Preencha suas informações para criar uma conta",
  SIGN_UP_EMAIL: "Verifique seu e-mail para o link de verificação.",
  EMAIL: "E-mail",
  EMAIL_PLACEHOLDER: "seu@email.com",
  EMAIL_REQUIRED: "E-mail é obrigatório",
  PASSWORD: "Senha",
  PASSWORD_PLACEHOLDER: "Senha",
  PASSWORD_REQUIRED: "Senha é obrigatória",
  CONFIRM_PASSWORD: "Confirmar Senha",
  CONFIRM_PASSWORD_PLACEHOLDER: "Confirmar Senha",
  CONFIRM_PASSWORD_REQUIRED: "Confirmação de senha é obrigatória",
  FORGOT_PASSWORD: "Esqueci a Senha",
  FORGOT_PASSWORD_LINK: "Esqueceu a senha?",
  FORGOT_PASSWORD_ACTION: "Enviar link de redefinição",
  FORGOT_PASSWORD_DESCRIPTION: "Digite seu e-mail para redefinir sua senha",
  FORGOT_PASSWORD_EMAIL: "Verifique seu e-mail para o link de redefinição.",
  DONT_HAVE_AN_ACCOUNT: "Não tem uma conta?",
  ALREADY_HAVE_AN_ACCOUNT: "Já tem uma conta?",
  NAME: "Nome",
  CONTINUE: "Continuar",
  CANCEL: "Cancelar",
  UPDATE: "Atualizar",
  DELETE: "Excluir",
  DONE: "Concluído",
};

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F5F5] via-white to-[#FFF0F0] px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#F4141A]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#F4141A]/3 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo e título */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <Image
              src="/logo-fenet-horizontal.png"
              alt="FENET"
              width={160}
              height={56}
              className="h-12 w-auto object-contain mx-auto transition-opacity group-hover:opacity-80"
              priority
            />
          </Link>
          <p className="mt-3 text-[13px] text-[#888888] font-medium tracking-wide uppercase">
            Área Restrita
          </p>
        </div>

        {/* Card do formulário */}
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.10)] border border-[#EBEBEB] overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-[#F4141A] to-[#FF5A5E]" />
          <div className="p-8">
            <AuthView path={path} localization={ptBR} />
          </div>
        </div>

        {/* Link voltar */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-[13px] text-[#888888] hover:text-[#F4141A] transition-colors duration-200 inline-flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M8.5 2.5L4 7L8.5 11.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Voltar ao site
          </Link>
        </div>
      </div>
    </main>
  );
}
