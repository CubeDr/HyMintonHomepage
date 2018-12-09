export default class Name {
  constructor(fname, lname) {
    this.fname = fname;
    this.lname = lname;
  }

  get isKorean() {
    return this.fname.match('[A-Za-z]') || this.lname.match('[A-Za-z]');
  }

  get name() {
    if(this.isKorean) return this.lname + this.fname;
    return this.fname + " " + this.lname;
  }
}
