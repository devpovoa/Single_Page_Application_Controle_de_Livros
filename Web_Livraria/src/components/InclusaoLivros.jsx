import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faUser,
  faImage,
  faCalendar,
  faDollarSign,
  faPaperPlane,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import { inAxios } from "../api/config_axios";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import CurrencyInput from "react-currency-input-field";

const InclusaoLivros = () => {
  const { register, handleSubmit, reset, control, setValue } = useForm();
  const [aviso, setAviso] = useState("");
  const [fotoPreview, setFotoPreview] = useState("");
  const [imagemValida, setImagemValida] = useState(true);

  useEffect(() => {
    if (aviso) {
      const timer = setTimeout(() => setAviso(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [aviso]);

  useEffect(() => {
    if (!fotoPreview) {
      setImagemValida(true);
      return;
    }

    const img = new Image();
    img.src = fotoPreview;
    img.onload = () => setImagemValida(true);
    img.onerror = () => setImagemValida(false);
  }, [fotoPreview]);

  const salvar = async (dados) => {
    const ano = dayjs(dados.ano).year();
    dados.ano = ano;

    const preco = parseFloat(
      dados.preco.replace("R$ ", "").replace(".", "").replace(",", ".")
    );
    dados.preco = preco;

    if (!imagemValida && fotoPreview) {
      setAviso("❌ URL da imagem inválida!");
      return;
    }

    try {
      const response = await inAxios.post("livros", dados);
      setAviso(
        `✅ OK! Livro cadastrado com sucesso! ${
          response.data?.id ? `Código: ${response.data.id}` : ""
        }`
      );
    } catch (err) {
      setAviso(`❌ Erro... Livro não cadastrado: ${err.message}`);
    }
    reset();
    setValue("ano", dayjs());
    setFotoPreview("");
  };

  return (
    <div className="container">
      <h4 className="fst-italic mt-3">Inclusão de Livros</h4>

      <form onSubmit={handleSubmit(salvar)}>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <div className="input-group">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faBook} />
            </span>
            <input
              type="text"
              id="titulo"
              className="form-control"
              required
              {...register("titulo")}
            />
          </div>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="autor">Autor:</label>
          <div className="input-group">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              type="text"
              id="autor"
              className="form-control"
              required
              {...register("autor")}
            />
          </div>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="foto">URL da Foto:</label>
          <div className="input-group">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faImage} />
            </span>
            <input
              type="url"
              id="foto"
              className="form-control"
              required
              {...register("foto")}
              onChange={(e) => setFotoPreview(e.target.value)}
            />
          </div>
          {!imagemValida && fotoPreview && (
            <div className="text-danger mt-1">⚠ URL da imagem inválida!</div>
          )}
          {imagemValida && fotoPreview && (
            <img
              src={fotoPreview}
              alt="Prévia"
              className="img-fluid mt-2"
              style={{ maxWidth: "200px" }}
            />
          )}
        </div>

        <div className="row mt-2">
          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="ano">Ano de Publicação:</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faCalendar} />
                </span>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="pt-br"
                >
                  <Controller
                    name="ano"
                    control={control}
                    defaultValue={dayjs()}
                    render={({ field }) => (
                      <DatePicker
                        views={["year"]}
                        label="Ano"
                        value={field.value}
                        onChange={(date) => setValue("ano", dayjs(date))}
                        renderInput={({ inputRef, inputProps }) => (
                          <input
                            ref={inputRef}
                            {...inputProps}
                            className="form-control"
                          />
                        )}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>

          <div className="col-sm-8">
            <div className="form-group">
              <label htmlFor="preco">Preço R$:</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faDollarSign} />
                </span>
                <Controller
                  name="preco"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <CurrencyInput
                      id="preco"
                      className="form-control"
                      prefix="R$ "
                      decimalSeparator=","
                      groupSeparator="."
                      fixedDecimalLength={2}
                      allowNegativeValue={false}
                      placeholder="Digite o preço"
                      onValueChange={(value) => setValue("preco", value)}
                      value={field.value}
                    />
                  )}
                />
              </div>
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
            onClick={() => {
              reset();
              setValue("ano", dayjs());
              setFotoPreview("");
            }}
          >
            <FontAwesomeIcon icon={faEraser} className="me-2" />
            Limpar
          </button>
        </div>
      </form>
      {aviso && (
        <div
          className={`alert ${
            aviso.startsWith("✅ OK!") ? "alert-success" : "alert-danger"
          } mt-4`}
        >
          {aviso}
        </div>
      )}
    </div>
  );
};

export default InclusaoLivros;
