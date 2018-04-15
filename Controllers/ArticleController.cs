using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace JustBlog.Controllers
{
    [Route("api/[controller]")]
    public class ArticleController : Controller
    {
        private static List<Article> Fixtures = new List<Article>
        {
            new Article(){ Id = Guid.NewGuid(),  Title = "Первый нах!", CreateDateTime = new DateTime(2017, 12, 1), Text = "Что-то текстовое тут должно быть..."}, 
            new Article(){ Id = Guid.NewGuid(),  Title = "Второй нах!", CreateDateTime = new DateTime(2017, 12, 2), Text = "Что-то текстовое тут должно быть..."}, 
            new Article(){ 
                Id = Guid.NewGuid(),  
                Title = "Третий нах!", 
                CreateDateTime = new DateTime(2017, 12, 3), 
                Text = 
                @"
                # Заголовок
                ## Подзаголовок
                Что-то текстовое тут должно быть 222
```javascript
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
```
                "}, 
        };

        [HttpGet]
        public IEnumerable<Article> Article()
        {
            return Fixtures.AsEnumerable();
        }
        
        [HttpPost]
        public Object PostArticle(Article article)
        {
            article.Id = Guid.NewGuid();
            article.CreateDateTime = DateTime.UtcNow;
            Fixtures.Add(article);
            return article;
        }
    }

    public class Article
    {
        public string Text { get; set; }
        public string Title { get; set; }
        public Guid Id { get; set; }
        public DateTime CreateDateTime { get; set; }
    }
}