class Customer {
  _id: string;
  _name: string;
  _adress: string;
  _active: boolean;
  constructor(id: string, name: string, adress: string) {
    this._id = id;
    this._name = name;
    this._adress = adress;
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (this._adress.length === 0) {
      throw new Error("Adress is mandatory to activate customer");
    }
  }

  desactivate() {
    this._active = false;
  }
}
