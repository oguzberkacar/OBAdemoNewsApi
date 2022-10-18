import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { HomePageForm } from './home.page.form';

// api key&url from newsapi.org
const newsApi = environment.newsApi;
const newsUrl = environment.newUrl;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  form: UntypedFormGroup;
  articles: any;
  isShowNews = true;
  images: any;
  totalArticle:any;

  constructor(private http: HttpClient, private formBuilder: UntypedFormBuilder) { }
  
  startNumber = 0;
  endNumber = 6;

  
  ngOnInit() {
    // building form
    this.form = new HomePageForm(this.formBuilder).createForm();

    // default value for news
    this.loadNews('New York');

   
  }


  clickS(s,e){
    this.startNumber = s;
    this.endNumber = e;
    
    this.articles = this.totalArticle.slice(s,e);
  }
  // geting value of topic from form and load news   
  search() {
    const topic = this.form.get('name').value;
    this.loadNews(topic);
  }

  // send the topic to news api and get the news
  loadNews(p) {
    this.getNews(p).subscribe(news => {
      this.totalArticle = news['articles']
      this.articles = this.totalArticle.slice(0, 10);
      console.log(news['articles'])
    })
  }

  // a function for show and hide the news
  showNews() {
    this.isShowNews = !this.isShowNews
  }



  // get the news from news api
  getNews(url): Observable<any> {
    return this.http.get(`${newsUrl}/everything?q=${url}&apiKey=${newsApi}&pageSize=60`)
  }
}

