import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: string;
  email: string;
  phone: string;
  message: string;

  statusMessage: string;
  statusColor = 'green';

  phonePattern = "\d{3}[\-]\d{3}[\-]\d{4}";

  submitted = false;

  constructor(private http: HttpClient) {
    this.statusMessage = '';
  }

  ngOnInit() {
  }

  /**
   * Send the email
   */
  sendEmail() {
    this.submitted = true;

    console.log(`${this.name}, ${this.email}, ${this.phone}, ${this.message}`);

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    let data = new HttpParams()
      .set('customerName', this.name)
      .set('customerPhone', this.phone)
      .set('customerEmail', this.email)
      .set('customerMessage', this.message)
      .set('address', 'john@johnaleblanc.com');

    this.http.post('send_form_email.php', data, options)
      .subscribe(error => {
        this.statusMessage = 'I was unable to send your message. Please manually send an email to john@johnaleblanc.com.';
        this.statusColor = 'red';
        console.log('Error ' + error);
      }, response => {
        this.statusMessage = 'Message has been sent';
        this.statusColor = 'green';
        console.log('success ' + response);
        setTimeout(() => this.statusMessage = '', 5000);
        this.resetForm();
      });
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.phone = '';
    this.message = '';
  }

}
