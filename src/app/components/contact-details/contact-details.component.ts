import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
})
export class ContactDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentContact: Contact = {
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    adresse: '',
    date_naissance: '',
    photo: '',
    occupation: '',
  };

  message = '';
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getContact(this.route.snapshot.params['id']);
    }
  }

  getContact(id: string): void {
    this.contactService.get(id).subscribe({
      next: (data) => {
        this.currentContact = data;
        console.log(data);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  updateContact(): void {
    this.message = '';
    this.contactService
      .update(this.currentContact.id, this.currentContact)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.message = 'The Book was updated successfully!';
        },
        error: (e) => {
          console.log(e);
        },
      });
  }

  deleteContact(): void {
    this.contactService.delete(this.currentContact.id).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/contacts']);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
