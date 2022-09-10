import { Component } from '@angular/core';
import { environment } from './../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngOnInit(): void{
    console.log("run angular web app with env")
    console.log(environment)
  }
}
