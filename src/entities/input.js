import Enum from "enum";

const INPUTTYPE = new Enum({
  'CALLING': "calling",
  'RAISING': "raising",
  'FOLDING': "folding"
})

class Input {
  constructor(inputType, value) {
    this.inputType = inputType
    this.value = value
  }
}

export default INPUTTYPE;
