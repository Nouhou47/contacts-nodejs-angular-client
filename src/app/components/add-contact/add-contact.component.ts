import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent implements OnInit {
  contact: Contact = {
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    adresse: '',
    date_naissance: '',
    photo: '',
    occupation: '',
  };
  submitted = false;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {}

  saveContact(): void {
    const data = {
      nom: this.contact.nom,
      prenom: this.contact.prenom,
      telephone: this.contact.telephone,
      email: this.contact.email,
      adresse: this.contact.adresse,
      date_naissance: this.contact.date_naissance,
      photo: this.contact.photo,
      occupation: this.contact.occupation,
    };

    this.contactService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  newContact(): void {
    this.submitted = false;
    this.contact = {
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      adresse: '',
      date_naissance: '',
      photo: '',
      occupation: '',
    };
  }
}
