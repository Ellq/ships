import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Location } from '@angular/common';

const QUERY_SHIPS = gql`
query ships($shipId: ID!) {
  ship(id: $shipId) {
    id
    name
    type
    home_port
    weight_kg
    year_built
    missions {
      name
    }
  }
}
`;

@Component({
  selector: 'app-ship-item-page',
  templateUrl: './ship-item-page.component.html',
  styleUrls: ['./ship-item-page.component.scss']
})
export class ShipItemPageComponent implements OnInit {
  shipId: string;
  ship: any;
  loading = true;
  error: any;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.shipId = params['id'];
    });

    this.apollo.watchQuery<any>({
      query: QUERY_SHIPS,
      variables: { "shipId": this.shipId }
    })
      .valueChanges
      .subscribe(({ loading, data }) => {
        this.loading = loading;
        this.error = data.error;
        this.ship = data.ship;
      })


  }

  goBack(): void {
    this.location.back();
  }

}
