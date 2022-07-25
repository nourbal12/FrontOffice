import { HttpClient } from "@angular/common/http";
import { Container } from "@angular/compiler/src/i18n/i18n_ast";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Evaluation } from "../models/Evaluation.model";
import { User } from "../models/User.model";

@Injectable({
    providedIn: 'root'
  })
export class EvaluationService{
    baseUrl: string = environment.base2Url;
    constructor(private http:HttpClient){

    }

    getEvaluationByArticleAndUser(userId, articleId) {
        return this.http.get(this.baseUrl+ "article_evaluation/a/" + userId + "/" + articleId);
    }

    getEvaluationByArticleAndEvaluation(articleId, evall) {
        return this.http.get(this.baseUrl+ "article_evaluation/b/" + articleId + "/" + evall);
    }

    createEvaluation(evaluation: Evaluation) {
        return this.http.post(this.baseUrl + "article_evaluation", evaluation);
    }

}