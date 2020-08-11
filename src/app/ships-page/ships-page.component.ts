import { FilterPipe } from './../filter.pipe';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { IDropdownSettings } from "ng-multiselect-dropdown";

const QUERY_SHIPS = gql`
{
  ships {
    id
    name
    type
    home_port
  }
}
`

@Component({
  selector: 'app-ships-page',
  templateUrl: './ships-page.component.html',
  styleUrls: ['./ships-page.component.scss']
})

export class ShipsPageComponent implements OnInit, OnDestroy {
  p: any = 1;
  ships: any[];
  loading = true;
  error: any;
  ports: any[];
  types: any[];

  dropdownSettings: IDropdownSettings = {};
  dropdownList: any[];

  fields: any = {
    name: "",
    type: "",
    port: []
  }
  filters: any = {
    name: "",
    type: "",
    port: []
  }

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: QUERY_SHIPS
    })
      .valueChanges
      .subscribe(({ loading, data }) => {
        console.log(this.fields.port);

        this.loading = loading;
        this.error = data.error;
        this.ships = data.ships;
        this.ports = this.ships.map(ship => ship.home_port);
        this.ports = this.ports.filter((v, i, a) => a.indexOf(v) === i);
        this.types = this.ships.map(ship => ship.type);
        this.types = this.types.filter((v, i, a) => a.indexOf(v) === i);

        this.dropdownList = this.ports.map((port, index) => {
          return { id: index, text: port }
        });

        this.dropdownSettings = {
          singleSelection: false,
          idField: 'id',
          textField: 'text',
          enableCheckAll: false,
          selectAllText: 'Выбрать все',
          unSelectAllText: 'Убрать выбор',
          itemsShowLimit: 3,
          allowSearchFilter: false,
        };

        if (JSON.parse(localStorage.getItem("port")).length > 0) {
          JSON.parse(localStorage.getItem("port")).forEach(item => {
            this.fields.port.push(item)
            this.filters.port.push(item)
          });
        } else {
          this.fields.port = this.ports.map((port, index) => {
            return { id: index, text: port };
          })
          this.filters.port = this.ports.map((port, index) => {
            return { id: index, text: port };
          })
        }

        this.p = +localStorage.getItem("page");
        this.fields.name = localStorage.getItem("name");
        this.fields.type = localStorage.getItem("type");

        window.onbeforeunload = () => this.ngOnDestroy();
        this.updateFilters();
      })
  }

  ngOnDestroy() {
    if (this.fields.name) {
      localStorage.setItem("name", this.fields.name);
    } else {
      localStorage.setItem("name", "");
    }
    localStorage.setItem("port", JSON.stringify(this.fields.port));
    localStorage.setItem("type", this.fields.type);
    localStorage.setItem("page", this.p);
  }

  updateFilters(): void {
    this.filters = Object.assign({}, this.fields);
  }
}
