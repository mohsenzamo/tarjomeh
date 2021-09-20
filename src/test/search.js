/**
 * 
 * @param {string[]} array 
 * @param {string} item 
 * @returns number
 */
function search(array, item) {
  let found = false;
  if (item == "") {
    return 0;
  } else {
    let lenght = array.length;
    for (let i = 0; i < lenght; i++) {
      if (array[i] == item) {
        found = true;
        return 1;
      }
    }
    if(found == false){
        return -1;
    }
  }
}
module.exports = search;
