import { Component } from '@angular/core';

import { RealTime } from '../../providers/sdk/services';
import { Account, FireLoopRef } from '../../providers/sdk/models';

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: any;
  private AccountReference: FireLoopRef<Account>;

  constructor(realtime: RealTime) {
    realtime
      .onReady()
      .subscribe(() => {
        realtime
          .onAuthenticated()
          .subscribe(() => {
            this.AccountReference = realtime.FireLoop.ref<Account>(Account);
            this.AccountReference.on('change')
              .subscribe(listAccounts => this.currentItems = listAccounts);
          })
        ;
      })
    ;
  }
}
