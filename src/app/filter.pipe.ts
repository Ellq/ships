import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(ships: any, filters: any): any {
    return ships.filter(item => {
      let ports: any;

      if (filters.port) {
        ports = filters.port.map((port) => {
          return port.text;
        })
      }

      let nameComparsion: boolean;
      if (filters.name) {
        nameComparsion = item.name.toLowerCase().indexOf(filters.name.toLowerCase()) >= 0;
      } else {
        nameComparsion = true;
      }

      let typeComparsion: boolean;
      if (filters.type) {
        typeComparsion = item.type.toLowerCase().indexOf(filters.type.toLowerCase()) >= 0;
      } else {
        typeComparsion = true;
      }


      let portComparsion = ports.filter((port) => {
        return (item.home_port == port);
      })

      return (nameComparsion && typeComparsion && portComparsion.length > 0)
    })
  }
}
