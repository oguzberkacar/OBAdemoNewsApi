import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  form: FormGroup;
  articles: any;
  isShowNews = true;
  images: any;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // building form
    this.form = new HomePageForm(this.formBuilder).createForm();

    // default value for news, btw i am from Antalya :)
    this.loadNews('antalya');
  }

  // geting value of topic from form and load news   
  search() {
    const topic = this.form.get('name').value;
    this.loadNews(topic);
  }

  // send the topic to news api and get the news
  loadNews(p) {
    this.getNews(p).subscribe(news => {
      this.articles = news['articles'];
      console.log(this.articles)
    })
  }

  // a function for show and hide the news
  showNews() {
    this.isShowNews = !this.isShowNews
  }

  // get the news from news api
  getNews(url): Observable<any> {
    return this.http.get(`${newsUrl}/everything?q=${url}&apiKey=${newsApi}`)
  }
}

