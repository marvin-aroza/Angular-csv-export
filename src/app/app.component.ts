import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'csv export';

  jsonData : any = [{
    name : 'Berlin',
    age : '45',
    country : 'Spain',
    phone : '896514326'
  },
  {
    name : 'Professor',
    age : '42',
    country : 'spain'
  },
  {
    name : 'Tokyo',
    age : '35',
    phone : '854668244'
  },
  {
    name : 'Helsinki',
    phone : '35863297'
  }];

  ngOnInit() {

  }

  exportCsv() {
    this.downloadFile(this.jsonData);
  }

  downloadFile(data, filename = 'data') {
    let arrHeader = ["name", "age", "country", "phone"];
    let csvData = this.ConvertToCSV(data, arrHeader);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", "sample.csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray, headerList) {
    console.log(objArray);
    console.log(headerList);
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';

    let newHeaders = ["Name", "Age", "Country", "Phone"];

    for (let index in newHeaders) {
      row += newHeaders[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];

        line += ',' + this.strRep(array[i][head]);
      }
      str += line + '\r\n';
    }
    return str;
  }

  strRep(data) {
    if(typeof data == "string") {
      let newData = data.replace(/,/g, " ");
       return newData;
    }
    else if(typeof data == "undefined") {
      return "-";
    }
    else if(typeof data == "number") {
      return  data.toString();
    }
    else {
      return data;
    }
  }
}
