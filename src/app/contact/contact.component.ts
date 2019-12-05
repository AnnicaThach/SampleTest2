import { Component, OnInit, NgModuleFactoryLoader } from '@angular/core';
import { Contact } from './contact.model';
import { Http } from '@angular/http';
import { LocalStorageService } from '../localStorageService';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface IContact {
  id?: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  owed: number;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Array<IContact> = [];
  constructor(
    // tslint:disable-next-line: deprecation
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  async ngOnInit() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts && contacts.length > 0) {
      this.contacts = contacts;
    } else {
    this.contacts = await this.loadContactsFromJson();
    }
    console.log('this.contacts from ngOninit...', this.contacts);

  }

  async loadContactsFromJson() {
    const contacts = await this.http.get('assets/contacts.json').toPromise();
    return contacts.json();
  }

  addContact() {
    const contact: IContact = {
      id: null,
      firstName: null,
      lastName: null,
      phone: null,
      email: null,
      owed: null
    };
    this.contacts.unshift(contact);
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

}
