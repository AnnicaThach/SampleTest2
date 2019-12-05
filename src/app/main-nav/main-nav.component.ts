import { Component, OnInit } from '@angular/core';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  constructor(private toastService: ToastService) { }

  ngOnInit() {
  }

  showAbout() {
    this.toastService.showToast('success', 5000, 'This application was created by Annica Thach (c)');

  }

}
