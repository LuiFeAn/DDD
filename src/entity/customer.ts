import Adress from "./adress";
export default class Customer {
  private _id: string;
  private _name: string = "";
  private _adress!: Adress;
  private _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
  }

  get isActive(){
    return this._active;
  }

  get name() {
    return this._name;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (!this._adress) {
      throw new Error("Adress is mandatory to activate customer");
    }
    this._active = true;
  }

  set Adress(adress: Adress) {
    this._adress = adress;
  }

  desactivate() {
    this._active = false;
  }
}
