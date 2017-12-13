import { Article } from '../store/Articles'
import {Adapter} from "./Adapter";

export class ArticleApi {
    
    static addArticle(article: Article): Promise<any>{
        return Adapter.path('/api/article').post(article);
    }
    
}