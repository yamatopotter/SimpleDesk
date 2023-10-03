import { GithubLogo } from "@phosphor-icons/react";
import { CommonButton } from "../components/CommonButton/CommonButton";
import { Container } from "../components/Container";

export const AboutSystem = () => {
  return (
    <Container>
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-xl">SimpleDesk v1</h1>
        <p>
          O SimpleDesk é um software criado para facilitar a abertura e
          gerenciamento de chamados em empresas. Ele oferece uma plataforma
          intuitiva para abrir chamados, acompanhar o status em tempo real e
          personalizar categorias e prioridades. O SimpleDesk torna a gestão de
          chamados mais eficiente, contribuindo para um melhor atendimento ao
          cliente e suporte interno.
        </p>
        <p>
          Desenvolvido por <a href="">Douglas</a> e <a href="">Matheus</a>.
        </p>

        <ul className="flex flex-col md:flex-row justify-around gap-4 md:gap-10">
          <li className="flex flex-col items-center gap-2">
            <p>Github do projeto</p>
            <a
              href="https://github.com/yamatopotter/SimpleDesk"
              target="_blank"
            >
              <CommonButton icon={<GithubLogo size={32} />} />
            </a>
          </li>
          <li className="flex flex-col items-center gap-2">
            <p>Github do Douglas</p>
            <a href="https://github.com/dougsn" target="_blank">
              <CommonButton icon={<GithubLogo size={32} />} />
            </a>
          </li>
          <li className="flex flex-col items-center gap-2">
            <p>Github do Matheus</p>
            <a href="https://github.com/yamatopotter" target="_blank">
              <CommonButton icon={<GithubLogo size={32} />} />
            </a>
          </li>
        </ul>
      </div>
    </Container>
  );
};
