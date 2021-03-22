const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'), //arquivo de entrada
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js', 
    },
    devServer:{
        contentBase: path.resolve(__dirname, 'public'), //vai ser executado pelo webpack-dev-server
    },
    module:{ //para converter arquivos javaScript
        rules:[
            {
                test: /\.js$/, //para converter os arquivos js. o $é para pegar qualquer arquivo com js de início.
                exclude: /node_modules/, //para excluir a pasta node_modules
                use:{
                    loader: 'babel-loader', //pega o arquivo e converte para com o babel
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use:[
                    {loader:'style-loader'}, // vai pegar o css e ingetar dentro do navegador
                    {loader:'css-loader'}, // vai ler o arquivo css e vai conseguir entender as importações dentro (imagens...)
                ]   
            },
            {
                test: /\.*\.(gif||png||jpe?g)$/i,
                use:{
                    loader: 'file-loader',
                }
            }
        ]
    },
};