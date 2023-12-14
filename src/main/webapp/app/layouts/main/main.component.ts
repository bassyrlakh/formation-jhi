import { Component, OnInit } from '@angular/core';

import { AccountService } from 'app/core/auth/account.service';
import { AppPageTitleStrategy } from 'app/app-page-title-strategy';
import { Router } from '@angular/router';
import { Account } from 'app/core/auth/account.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html',
  providers: [AppPageTitleStrategy],
})
export default class MainComponent implements OnInit {
  account: Account | null = null;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private appPageTitleStrategy: AppPageTitleStrategy,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    // try to log in automatically
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
    this.accountService.identity().subscribe();
  }
}
