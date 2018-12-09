export default class Time {

  constructor(year=0, month=1, date=1, hour=0, minute=0) {
    this.year = year;
    this.month = month;
    this.date = date;
    this.hour = hour;
    this.minute = minute;
  }

  get formatString() {
    return this.datePart + ' ' + this.timePart;
  }

  get datePart() {
    let ss = this.strings;
    return `${ss.y}-${ss.m}-${ss.d}`;
  }

  get timePart() {
    let ss = this.strings;
    return `${ss.H}:${ss.M}`;
  }

  get koreanString() {
    return this.koreanDatePart + " " + this.koreanTimePart;
  }

  get koreanDatePart() {
    return `${this.year}년 ${this.month}월 ${this.date}일`;
  }

  get koreanTimePart() {
    let result = "";
    if(this.hour >= 12) result += '오후 ';
    else result += '오전 ';

    result += `${this.hour>12? this.hour-12 : this.hour}시`;
    if(this.minute !== 0) result += ` ${this.minute}분`;
    return result;
  }

  static fromFormatString(str) {
    let year = parseInt(str.slice(0, 4));
    let month = parseInt(str.slice(5, 7));
    let date = parseInt(str.slice(8, 10));
    let hour = parseInt(str.slice(11, 13));
    let min = parseInt(str.slice(14, 16));

    return new Time(year, month, date, hour, min);
  }

  get strings() {
    return {
      y: this.year.toString().paddingLeft("0000"),
      m: this.month.toString().paddingLeft("00"),
      d: this.date.toString().paddingLeft("00"),
      H: this.hour.toString().paddingLeft("00"),
      M: this.minute.toString().paddingLeft("00")
    };
  }
}
