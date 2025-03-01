import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faEraser } from "@fortawesome/free-solid-svg-icons";
import { inAxios } from "../api/config_axios";

const InclusaoLivros = () => {
  const { register, handleSubmit, reset } = useForm();
  const [aviso, setAviso] = useState("");
  const [formData, setFormData] = useState(null);

  const salvar = async (dados) => {
    setFormData(dados);

    try {
      const response = await inAxios.post("livros", dados);
      setAviso(`OK! Livro cadastrado com código ${response.data.id}`);
    } catch (err) {
      setAviso(`Erro... Livro não cadastrado: ${err}`);
    }

    setTimeout(() => {
      setAviso("");
    }, 5000);

    reset({ titulo: "", autor: "", foto: "", ano: "", preco: "" });
  };

  const limpar = () => {
    reset();
    setFormData(null);
  };

  return (
    <div className="container">
      <h4 className="fst-italic mt-3">Inclusão</h4>
      <form onSubmit={handleSubmit(salvar)}>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            className="form-control"
            required
            autoFocus
            {...register("titulo")}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="autor">Autor:</label>
          <input
            type="text"
            id="autor"
            className="form-control"
            required
            {...register("autor")}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="foto">URL da Foto:</label>
          <input
            type="url"
            id="foto"
            className="form-control"
            required
            {...register("foto")}
          />
        </div>
        <div className="row mt-2">
          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="ano">Ano de Publicação:</label>
              <input
                type="number"
                id="ano"
                className="form-control"
                required
                {...register("ano")}
              />
            </div>
          </div>
          <div className="col-sm-8">
            <div className="form-group">
              <label htmlFor="preco">Preço R$:</label>
              <input
                type="number"
                step="0.01"
                id="preco"
                className="form-control"
                required
                {...register("preco")}
              />
            </div>
          </div>
        </div>

        <div className="mt-3">
          <button type="submit" className="btn btn-primary btn-icon">
            <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
            Enviar
          </button>
          <button
            type="button"
            className="btn btn-danger btn-icon ms-3"
            onClick={limpar}
          >
            <FontAwesomeIcon icon={faEraser} className="me-2" />
            Limpar
          </button>
        </div>
      </form>

      {formData && (
        <div
          className={
            aviso.startsWith("OK!")
              ? "alert alert-success mt-4"
              : aviso.startsWith("Erro")
              ? "alert alert-danger mt-4"
              : ""
          }
        >
          {aviso}
          Dados submetidos com sucesso! <br />
          <strong>Título:</strong> {formData.titulo} <br />
          <strong>Autor:</strong> {formData.autor} <br />
        </div>
      )}
    </div>
  );
};

export default InclusaoLivros;
