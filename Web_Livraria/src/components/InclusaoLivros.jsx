import { useForm } from "react-hook-form";
import { inAxios } from "../api/config_axios";

const InclusaoLivros = () => {
  const { register, handleSubmit } = useForm();

  const salvar = (campos) => {
    JSON.stringify(campos);
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
        <input type="submit" value="Enviar" className="btn btn-primary mt-3" />
        <input
          type="reset"
          value="Limpar"
          className="btn btn-danger mt-3 ms-3"
        />
      </form>
      <div className="alert"></div>
    </div>
  );
};
export default InclusaoLivros;
