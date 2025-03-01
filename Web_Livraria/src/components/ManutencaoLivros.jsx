import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { inAxios } from "../api/config_axios";
import ItemLista from "./ItemLista";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faList } from "@fortawesome/free-solid-svg-icons";

const ManutencaoLivros = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const palavra = watch("palavra");

  const fetchLivros = async (endpoint = "livros", params = {}) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const url = `${inAxios.defaults.baseURL}/${endpoint}`; // Verifica a URL gerada
      console.log("URL da requisição:", url); // Debug da URL
      const { data } = await inAxios.get(url, { params });
      if (data.length === 0) {
        setNoResults(true);
      } else {
        setLivros(data);
        setNoResults(false);
      }
    } catch (err) {
      setErrorMessage(`Erro ao obter os dados: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  const filtrarLista = (dados) => {
    const { palavra } = dados;
    fetchLivros(`livros/filtro/${palavra}`);
  };

  const excluirRegistro = async (id, titulo) => {
    if (!window.confirm(`Confirmar a exclusão do livro "${titulo}"?`)) return;

    try {
      await inAxios.delete(`livros/${id}`);
      setLivros((prevLivros) => prevLivros.filter((livro) => livro.id !== id));
    } catch (err) {
      setErrorMessage(`Erro ao excluir livro: ${err.message}`);
    }
  };

  const alterarRegistro = async (id, campo, novoValor) => {
    if (
      !window.confirm(
        `Deseja realmente alterar o campo "${campo}" para "${novoValor}"?`
      )
    )
      return;

    try {
      await inAxios.patch(`livros/${id}`, { [campo]: novoValor });
      setLivros((prevLivros) =>
        prevLivros.map((livro) =>
          livro.id === id ? { ...livro, [campo]: novoValor } : livro
        )
      );
    } catch (err) {
      setErrorMessage(`Erro ao alterar livro: ${err.message}`);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-7">
          <h4 className="fst-italic mt-3">Manutenção</h4>
        </div>
        <div className="col-sm-5">
          <form onSubmit={handleSubmit(filtrarLista)}>
            <div className="input-group mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Título ou autor"
                required
                {...register("palavra")}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!palavra}
              >
                <FontAwesomeIcon icon={faSearch} className="me-2" />
                Pesquisar
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  reset({ palavra: "" });
                  fetchLivros();
                }}
              >
                <FontAwesomeIcon icon={faList} className="me-2" />
                Todos
              </button>
            </div>
          </form>
        </div>
      </div>

      {errorMessage && (
        <div className="alert alert-danger mt-3">{errorMessage}</div>
      )}

      {noResults && !loading && (
        <div className="alert alert-warning mt-3">Nenhum livro encontrado.</div>
      )}

      {loading && (
        <div className="text-center mt-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      )}

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Cód.</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Ano</th>
            <th>Preço R$</th>
            <th>Foto</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {!loading && livros.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                Nenhum livro encontrado.
              </td>
            </tr>
          ) : (
            livros.map((livro) => (
              <ItemLista
                key={livro.id}
                id={livro.id}
                titulo={livro.titulo}
                autor={livro.autor}
                ano={livro.ano}
                preco={livro.preco}
                foto={livro.foto}
                excluirClick={() => excluirRegistro(livro.id, livro.titulo)}
                alterarClick={alterarRegistro}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManutencaoLivros;
