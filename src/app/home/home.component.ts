import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  zipCode!:string
  key: string = 'Name';
  myItem!: string;
  zcode!: number;data:any;
  url = 'http://api.openweathermap.org/data/2.5/weather?id=';
  ccond!: string;      temp!: number;      temp_max!: number;      temp_min!: number;
  user: any;
  ngOnInit(): void {
      
  }
  sun=false; snow=false; rain=false; clouds=false;
  constructor(private service: UserService) {}

    setZip(zipcode:any) {
         this.zcode = zipcode;
        //   localStorage.setItem('Code ', zipcode);
        let exm = [];
        if(localStorage.getItem('user')) {
          exm = JSON.parse(localStorage.getItem('user') || '{}');
          exm = [zipcode, ...exm];
        }else {
          exm = [zipcode];
        }
        localStorage.setItem('user',JSON.stringify(exm));
        this.user=exm
          this.getData()
    }
    sub(){
      localStorage.removeItem('user');
    }

    getData() {
        this.service.getData(this.url + this.zcode+'&appid=5a4b2d457ecbef9eb2a71e480b947604').subscribe((res) => {
          this.data = res;
          this.ccond = this.data.weather[0].main;
          this.temp = this.data.main.temp;
          this.temp_max = this.data.main.temp_max;
          this.temp_min = this.data.main.temp_min;
          console.log(this.ccond + '   ' + this.temp  + '   ' +this.temp_min + '   ' +this.temp_max );
          if(this.ccond=="Snow"){
            this.snow=!this.snow
          }
          else if(this.ccond=="Rain"){
            this.rain= !this.rain
          }
          else if(this.ccond=="Clouds"){
            this.clouds=!this.clouds
          }
          else
          this.sun = !this.sun
    });    
  }
}

