import { Component, OnInit } from '@angular/core';
import { JoinService } from './services/join.service';

@Component({
  selector: 'app-join-page',
  templateUrl: './join.page.html',
  styleUrls: ['./join.page.scss']
})

export class JoinComponent implements OnInit {

  users!: any;
  constructor(private readonly joinService: JoinService) { }

  ngOnInit(): void {
    this.users = this.joinService.getUsers();
    console.log('users', this.users.subscribe((data: any) => console.log(data)));
    return this.users;
  }
}
