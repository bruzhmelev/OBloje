using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace JustBlog.Controllers
{
    [Route("api/[controller]")]
    public class ArticleController : Controller
    {
        private static Article[] Fixtures = new Article[]
        {
            new Article(){ Id = 1,  Title = "Первый нах!", CreateDateTime = new DateTime(2017, 12, 1), Text = "Что-то текстовое тут должно быть, хз что ааааа"}, 
            new Article(){ Id = 2,  Title = "Второй нах!", CreateDateTime = new DateTime(2017, 12, 2), Text = "Что-то текстовое тут должно быть, хз что ааааа"}, 
            new Article(){ Id = 3,  Title = "Третий нах!", CreateDateTime = new DateTime(2017, 12, 3), Text = "Что-то текстовое тут должно быть, хз что ааааа"}, 
        };

        [HttpGet("[action]")]
        public IEnumerable<Article> Article()
        {
            return Fixtures.AsEnumerable();
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }

    public class Article
    {
        public string Text { get; set; }
        public string Title { get; set; }
        public int Id { get; set; }
        public DateTime CreateDateTime { get; set; }
    }
}