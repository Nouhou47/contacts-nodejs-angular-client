import { Component, OnInit } from '@angular/core';
import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ContactService],
})
export class AppComponent implements OnInit {
  title = 'contacts-nodejs';
  contacts: any;
  
  constructor(private contactService: ContactService) {}

  ngOnInit() {
    console.log('On init...');
    this.contactService.getAll().subscribe((datas) => {
      this.contacts = datas;
    });
  }
}
