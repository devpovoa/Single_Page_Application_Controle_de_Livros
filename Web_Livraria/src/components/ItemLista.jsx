import { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const ItemLista = ({
  id,
  titulo,
  autor,
  ano,
  preco,
  foto,
  excluirClick,
  alterarClick,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [campo, setCampo] = useState("titulo");
  const [novoValor, setNovoValor] = useState("");

  const abrirModal = useCallback(() => {
    setNovoValor(
      campo === "preco"
        ? Number(preco)
        : campo === "ano"
        ? Number(ano)
        : campo === "foto"
        ? foto
        : titulo
    );
    setShowModal(true);
  }, [campo, preco, ano, foto, titulo]);

  const fecharModal = useCallback(() => setShowModal(false), []);

  const confirmarAlteracao = useCallback(() => {
    if (novoValor.trim() === "") return;
    alterarClick(id, campo, novoValor);
    fecharModal();
  }, [id, campo, novoValor, alterarClick, fecharModal]);

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{titulo}</td>
        <td>{autor}</td>
        <td>{ano}</td>
        <td className="text-end">
          {preco
            ? Number(preco).toLocaleString("pt-br", {
                minimumFractionDigits: 2,
              })
            : "0,00"}
        </td>
        <td className="text-center">
          <img
            src={foto || "/imagens/default-book.png"}
            alt={`Capa do livro ${titulo}`}
            width="75"
            onError={(e) => (e.target.src = "/imagens/default-book.png")}
          />
        </td>
        <td className="text-center">
          <button
            className="btn btn-link p-0 text-danger fw-bold"
            title="Excluir"
            aria-label={`Excluir livro ${titulo}`}
            onClick={() => excluirClick(id, titulo)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>

          <button
            className="btn btn-link p-0 text-success fw-bold ms-2"
            title="Alterar"
            aria-label={`Alterar livro ${titulo}`}
            onClick={abrirModal}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </td>
      </tr>

      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          aria-hidden={!showModal}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Alterar Livro</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={fecharModal}
                ></button>
              </div>
              <div className="modal-body">
                <label className="form-label">Selecione o campo:</label>
                <select
                  className="form-select mb-3"
                  value={campo}
                  onChange={(e) => setCampo(e.target.value)}
                >
                  <option value="titulo">Título</option>
                  <option value="autor">Autor</option>
                  <option value="ano">Ano</option>
                  <option value="preco">Preço</option>
                  <option value="foto">Foto</option>
                </select>

                <label className="form-label">Novo valor:</label>
                <input
                  type={
                    campo === "ano" || campo === "preco" ? "number" : "text"
                  }
                  className="form-control"
                  value={novoValor}
                  onChange={(e) => setNovoValor(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={fecharModal}>
                  Cancelar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={confirmarAlteracao}
                  disabled={!novoValor.trim()}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemLista;
