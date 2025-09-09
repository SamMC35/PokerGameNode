import { generateCombinations } from "../src/service/deckService.js";

function test() {
  var arr = ["24", "32445", "Hello", "2445", "fef"]

  console.log(generateCombinations(arr))
}

test()
