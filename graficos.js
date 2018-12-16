function desenharPizza() {
    var tabela = new google.visualization.DataTable();

    tabela.addColumn("string", "Categorias");
    tabela.addColumn("number", "Valores");
    tabela.addRows([
        ['Educação', 2000],
        ['Transporte', 500],
        ['Lazer', 230],
        ['Saúde', 50],
        ['Cartão de Crédito', 900],
        ['Alimentação', 260]
    ]);

    var options = {
        title: 'Tipos de Gastos',
        height: 450,
        width: 850,
        // pieHole:0.4 // Deixa o grafico de pizza como grafico de "Donut"
        is3D: true,
        legend: 'labeled', // left, top, bottom
        pieSliceText: 'value', // value, label
        // colors: ['silver','red','yellow','blue','pink','purple']
        slices: {
            //  0: {offset:0.2},
            1: { color: 'silver' },
            2: { color: '#A6A6A6' },
            3: { color: 'grey' },
            4: { offset: 0.2 },
            5: { color: 'grey' },
            // 4: {},
        }
    };

    var graficoPizza = new google.visualization.PieChart(document.getElementById("graficoPizza"));
    graficoPizza.draw(tabela, options);

    // Grafico de Linha
    var gastosMes = [
        ['Jan', 800], ['Fev', 400], ['Mar', 1100], ['Abr', 400],
        ['Mai', 500], ['Jun', 750], ['Jul', 1500], ['Ago', 650],
        ['Set', 850], ['Out', 400], ['Nov', 1000], ['Dez', 720]
    ];

    var optionsGrafLinha = {
        title: "Gastos por Mês",
        // width: 650,
        height: 300,
        curveType: "function",
        legend: 'none',
        vAxis: {
            format: 'currency',
            gridlines: {
                count: 5,
                color: 'transparent'
            }
        },
    };

    tabela = new google.visualization.DataTable();
    tabela.addColumn("string", "Mês");
    tabela.addColumn("number", "Gastos");
    tabela.addRows(gastosMes);

    var graficoLine = new google.visualization.LineChart(document.getElementById("graficoLine"));
    graficoLine.draw(tabela, optionsGrafLinha);

    // Grafico de colunas
    var entradaSaidaMes = [
        ["Mês", "Entrada", "Saída"],
        ['Jan', 2500, 1000], ['Fev', 2000, 500],
        ['Mar', 3000, 1300], ['Abr', 1500, 1700],
        ['Mai', 5000, 2250], ['Jun', 3567, 3000],
        ['Jul', 3452, 1468], ['Ago', 1833, 5250],
        ['Set', 3803, 5500], ['Out', 1800, 1000],
        ['Nov', 3569, 1500], ['Dez', 3000, 1740]
    ];

    var tabelaGrafEntradaSaidaMes = new google.visualization.arrayToDataTable(entradaSaidaMes);
    var graficoColumns = new google.visualization.ColumnChart(document.getElementById("graficoColumns"));

    var optionsGrafColumn = {
        title: "Entradas e Saídas da Conta",
        width: 800,
        height: 400,
        vAxis: {
            format: 'currency',
            gridlines: {
                color: 'transparent'
            },
            title: 'Valores'
        },
        hAxis: { title: 'Mês' }
    };

    graficoColumns.draw(tabelaGrafEntradaSaidaMes, optionsGrafColumn);


    // Tipo de gastos grafico de barra
    var dadosJson = $.ajax({
        url: 'https://gist.githubusercontent.com/TiagoeSouza/5eb1c5e196d32b93f09c053996449db3/raw/e1ae64ec2e040d0a6ec92992a467c76319c3390c/dados.json',
        dataType: 'json',
        async: false
    }).responseText;

    var tabelaGrafTipoGastosBar = new google.visualization.DataTable(dadosJson);

    /*tabelaGrafTipoGastosBar.addColumn("string", "Categorias");
    tabelaGrafTipoGastosBar.addColumn("number", "Valores");
    tabelaGrafTipoGastosBar.addColumn({ type: "string", role: 'annotation' });
    tabelaGrafTipoGastosBar.addColumn({ type: "string", role: 'style' });
    tabelaGrafTipoGastosBar.addRows([
        ['Educação', 2000, "R$ 2.000,00", "#3366cc"],
        ['Transporte', 500, "R$ 500,00", "grey"],
        ['Lazer', 230, "R$ 230,00", "grey"],
        ['Saúde', 50, "R$ 50,00", "grey"],
        ['Cartão de Crédito', 900, "R$ 900,00", "#990099"],
        ['Alimentação', 260, "R$ 260,00", "grey"]
    ]);*/

    tabelaGrafTipoGastosBar.sort([{ column: 1, desc: true }]); // OR tabelaGrafTipoGastosBar.sort(["Valores"]);
    // var conversao = tabelaGrafTipoGastosBar.toJSON();
    // console.log("JsonConversao", conversao);

    var graficoTipoGastosBar = new google.visualization.BarChart(document.getElementById("graficoTipoGastosBar"));
    var optionsGraficoTipoGastosBar = {
        title: 'Tipos de Gastos',
        height: 300,
        width: 800,
        vAxis: {
            gridlines: {
                count: 0,
                color: 'transparent'
            }
        },
        hAxis: {
            gridlines: {
                color: 'transparent',
            },
            format: 'currency',
            textPosition: 'none'
        },
        annotations: {
            alwaysOutside: true
        },
        legend: 'none'
    };

    graficoTipoGastosBar.draw(tabelaGrafTipoGastosBar, optionsGraficoTipoGastosBar);

    // Grafico de barras consumindo arquivo .json
    var dadosJson = $.ajax({
        // url: 'dados.json',
        url: "https://gist.githubusercontent.com/TiagoeSouza/8d7f97ae319f2e0c0dad1d66d948ac7f/raw/999faf03ce11827c0cf69c00dbdbd46bf27a1b00/dados.json",
        dataType: 'json',
        mimeType: 'application-json',
        async: false,
    }).responseText;
    // console.log(dadosJson);
    var tabelaGrafTipoGastosBarJson = new google.visualization.DataTable(dadosJson);

    var graficoTipoGastosBarJson = new google.visualization.BarChart(document.getElementById("graficoTipoGastosBarJson"));
    tabelaGrafTipoGastosBarJson.sort([{ column: 1, desc: true }]); // OR tabelaGrafTipoGastosBar.sort(["Valores"]);

    var optionsGraficoTipoGastosBarJson = {
        title: 'Usuários e Poupanças',
        height: 400,
        width: 800,
        legend: 'none',
        hAxis: {
            gridlines: {
                color: 'transparent'
            },
            textPosition: 'none'
        },
        annotations: {
            alwaysOutside: true
        }
    };
    graficoTipoGastosBarJson.draw(tabelaGrafTipoGastosBarJson, optionsGraficoTipoGastosBarJson);


}
