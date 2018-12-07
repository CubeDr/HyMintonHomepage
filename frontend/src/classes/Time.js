export default class Time {

  constructor(year=0, month=1, date=1, hour=0, minute=0) {
    this.year = year;
    this.month = month;
    this.date = date;
    this.hour = hour;
    this.minute = minute;
  }

  get formatString() {
    let ss = this.strings;
    return `${ss.y}/${ss.m}/${ss.d} ${ss.H}:${ss.M}`;
  }

  get koreanString() {
    let result = `${this.year}년 ${this.month}월 ${this.date}일 `;
    if(this.hour >= 12) result += '오후 ';
    else result += '오전 ';

    result += `${this.hour>12? this.hour-12 : this.hour}시`;
    if(this.minute !== 0) result += ` ${this.minute}분`;
    return result;
  }

  static fromFormatString(str) {
    let year = parseInt(time.slice(0, 4));
    let month = parseInt(time.slice(5, 7));
    let date = parseInt(time.slice(8, 10));
    let hour = parseInt(time.slice(11, 13));
    let min = parseInt(time.slice(14, 16));

    return new Time(year, month, date, hour, min);
  }

  get toStrings() {
    return {
      y: this.year.toString().paddingLeft("0000"),
      m: this.month.toString().paddingLeft("00"),
      d: this.date.toString().paddingLeft("00"),
      H: this.hour.toString().paddingLeft("00"),
      M: this.minute.toString().paddingLeft("00")
    };
  }
}
