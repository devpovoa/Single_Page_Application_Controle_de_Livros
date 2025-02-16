const Inclusao = () => {
  return (
    <div className="container">
      <h4 className="fst-italic mt-3">Inclusão</h4>
      <form>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            className="form-control"
            required
            autoFocus
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="autor">Autor:</label>
          <input type="text" id="autor" className="form-control" required />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="foto">URL da Foto:</label>
          <input type="url" id="foto" className="form-control" required />
        </div>
        <div className="row mt-2">
          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="ano">Ano de Publicação:</label>
              <input type="number" id="ano" className="form-control" required />
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
export default Inclusao;
