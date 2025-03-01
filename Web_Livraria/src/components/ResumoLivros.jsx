import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { inAxios } from "../api/config_axios";

const ResumoLivros = () => {
  const [resumo, setResumo] = useState([]);
  const [grafico, setGrafico] = useState([]);
  const [graficoTipo, setGraficoTipo] = useState("ColumnChart");
  const [registrosPeriodo, setRegistrosPeriodo] = useState([]);
  const obterDados = async () => {
    try {
      const dadosResumo = await inAxios.get("livros/dados/resumo");
      setResumo(dadosResumo.data);

      const dadosGrafico = await inAxios.get("livros/dados/grafico");
      const arrayGrafico = [["Ano", "R$ Total"]];
      dadosGrafico.data.map((dado) =>
        arrayGrafico.push([dado.ano.toString(), dado.total])
      );

      setGrafico(arrayGrafico);
    } catch (err) {
      alert(`Erro... Não foi possível obter os dados: ${err.message}`);
    }
  };

  useEffect(() => {
    obterDados();
  }, []);

  const alternarGrafico = () => {
    setGraficoTipo(graficoTipo === "ColumnChart" ? "PieChart" : "ColumnChart");
  };

  const onClickGrafico = (chartWrapper) => {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    if (selection.length > 0) {
      const item = selection[0];
      if (item.row !== null) {
        const anoClicado = grafico[item.row + 1][0];
        buscarRegistros(anoClicado);
      }
    }
  };

  const buscarRegistros = async (ano) => {
    try {
      const registros = await inAxios.get(`livros/dados/registros/${ano}`);
      setRegistrosPeriodo(registros.data);
    } catch (err) {
      alert(`Erro ao buscar registros: ${err.message}`);
    }
  };

  return (
    <div className="container">
      <h4 className="mt-3">Resumo</h4>

      <div className="d-flex flex-wrap justify-content-between mt-3">
        <div
          className="btn btn-outline-primary btn-lg mb-2"
          style={{ maxWidth: "300px" }}
        >
          <span className="material-icons" style={{ marginRight: "10px" }}>
            book
          </span>
          <p className="badge bg-danger">{resumo.num}</p>
          <p>Nº de Livros Cadastrados</p>
        </div>

        <div
          className="btn btn-outline-primary btn-lg mb-2"
          style={{ maxWidth: "300px" }}
        >
          <span className="material-icons" style={{ marginRight: "10px" }}>
            attach_money
          </span>
          <p className="badge bg-danger">
            {Number(resumo.soma).toLocaleString("pt-br", {
              minimumFractionDigits: 2,
            })}
          </p>
          <p>Total Investido em Livros</p>
        </div>

        <div
          className="btn btn-outline-primary btn-lg mb-2"
          style={{ maxWidth: "300px" }}
        >
          <span
            className="material-icons"
            style={{ marginRight: "10px", color: "green" }}
          >
            arrow_upward
          </span>
          <p className="badge bg-danger">
            {Number(resumo.maior).toLocaleString("pt-br", {
              minimumFractionDigits: 2,
            })}
          </p>
          <p>Maior Preço Cadastrado</p>
        </div>

        <div
          className="btn btn-outline-primary btn-lg mb-2"
          style={{ maxWidth: "300px" }}
        >
          <span
            className="material-icons"
            style={{ marginRight: "10px", color: "red" }}
          >
            arrow_downward
          </span>
          <p className="badge bg-danger">
            {Number(resumo.media).toLocaleString("pt-br", {
              minimumFractionDigits: 2,
            })}
          </p>
          <p>Preço Médio dos Livros</p>
        </div>
      </div>

      <div className="mb-3">
        <button className="btn btn-outline-success" onClick={alternarGrafico}>
          {graficoTipo === "ColumnChart"
            ? "Exibir Gráfico de Pizza"
            : "Exibir Gráfico de Barras"}
        </button>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Chart
          width={800}
          height={400}
          chartType={graficoTipo}
          loader={<div>Carregando Gráfico...</div>}
          data={grafico}
          options={{
            title: "Total de Investimentos em Livros - por Ano de Publicação",
            chartArea: { width: "80%" },
            hAxis: { title: "Ano de Publicação" },
            vAxis: { title: "Preço Acumulado R$" },
            legend: { position: "none" },
          }}
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => onClickGrafico(chartWrapper),
            },
          ]}
        />
      </div>

      {registrosPeriodo.length > 0 && (
        <div className="mt-4">
          <h5>Registros para o Ano Selecionado:</h5>
          <ul>
            {registrosPeriodo.map((registro, index) => (
              <li key={index}>{`Livro: ${
                registro.titulo
              }, Preço: R$ ${registro.preco.toFixed(2)}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumoLivros;
