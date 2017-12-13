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
            new Article(){ Id = Guid.NewGuid(),  Title = "Первый нах!", CreateDateTime = new DateTime(2017, 12, 1), Text = "Что-то текстовое тут должно быть, хз что ааааа"}, 
            new Article(){ Id = Guid.NewGuid(),  Title = "Второй нах!", CreateDateTime = new DateTime(2017, 12, 2), Text = "Что-то текстовое тут должно быть, хз что ааааа"}, 
            new Article(){ Id = Guid.NewGuid(),  Title = "Третий нах!", CreateDateTime = new DateTime(2017, 12, 3), Text = "Что-то текстовое тут должно быть, хз что ааааа"}, 
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