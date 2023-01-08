import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  //contacts?: any;
  contacts?: Contact[];
  currentContact: Contact = {};
  currentIndex = -1;
  queryparam = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.retrieveContacts();
  }

  retrieveContacts(): void {
    // .map(res => res.json().data)
    this.contactService.getAll().subscribe({
      next: (data) => {
        this.contacts = data;
        console.log('all the noen: ', data);
      },
      error: (e) => console.log(e),
    });
  }

  refreshList(): void {
    this.retrieveContacts();
    this.currentContact = {};
    this.currentIndex = -1;
  }

  setActiveContact(contact: Contact, index: number): void {
    this.currentContact = contact;
    this.currentIndex = index;
  }

  removeAllContacts(): void {
    this.contactService.deleteAll().subscribe({
      next: (response) => {
        console.log(response);
        this.refreshList();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  exportToPDF() {
    this.contactService.exportToPDF().subscribe({
      next: (data) => {
        let downloadUrl = window.URL.createObjectURL(data);
        saveAs(downloadUrl);
      },
      error: (e) => console.log(e),
    });
  }

/*  exportToPDF(): void {
    this.contactService
      .exportToPDF()
      .toPromise()
      .then((data) => {
        saveAs(data, 'Contacts-exported.pdf');
      })
      .catch((err) => console.error('Download error: ', err));
  }*/

  searchNom(): void {
    this.currentContact = {};
    this.currentIndex = -1;

    console.log('query param: ', this.queryparam);
    this.contactService.findByNameOrSurname(this.queryparam).subscribe({
      next: (data) => {
        this.contacts = data;
        console.log(data);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
