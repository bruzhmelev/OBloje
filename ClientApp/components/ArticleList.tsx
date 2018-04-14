import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as ArticlesState from '../store/Articles';
import Highlight from 'react-highlight';
import { DateOfCreation } from './DateOfCreation/DateOfCreation';

// At runtime, Redux will merge together...
type ArticleListProps =
    ArticlesState.ArticlesState        // ... state we've requested from the Redux store
    & typeof ArticlesState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ }>; // ... plus incoming routing parameters

class ArticleList extends React.Component<ArticleListProps, {}> {
    componentWillMount() {
        this.props.requestArticles();
    }

    public render() {
        return (
            <div>
                <h1>Статьи</h1>
                <p>[Описание вообщем про статьи и.т.п]</p>
                { this.renderArticles() }
            </div>
        ); 
    }
    
    private renderArticles() {
        return this.props.articles.map(a => {
            const date = a.createDateTime && a.createDateTime.toString()

            return (
            <div key={a.id}>
                <h2>{a.title}</h2>
                <DateOfCreation date={a.createDateTime} />
                <p>{a.text} </p>
                <Highlight className='js'>{
`   
const clientBundleConfig = merge(sharedConfig(), {
    entry: { 'main-client': './ClientApp/boot-client.tsx' },
    module: {
        rules: [
            { test: /\.css$/, use: ExtractTextPlugin.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }) }
        ]
    },
    output: { path: path.join(__dirname, clientBundleOutputDir) },
    plugins: [
        new ExtractTextPlugin('site.css'),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./wwwroot/dist/vendor-manifest.json')
        })
    ].concat(isDevBuild ? [
        // Plugins that apply in development builds only
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map', // Remove this line if you prefer inline source maps
            moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
        })
    ] : [
        // Plugins that apply in production builds only
        new webpack.optimize.UglifyJsPlugin()
    ])
});
`
                }</Highlight>
            </div>
        )});
    }
}

export default connect(
    (state: ApplicationState) => state.articles, // Selects which state properties are merged into the component's props
    ArticlesState.actionCreators                  // Selects which action creators are merged into the component's props
)(ArticleList) as typeof ArticleList;
