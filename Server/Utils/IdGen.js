class IdGen {
    // Needs static to be called directly
    static getId() {
      return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
}
  
module.exports = IdGen;
  
// Math.random() generates a random number between 0 (inclusive) and 1 (exclusive).
// .toString(36) converts that number into a base-36 string, using digits and letters (0-9, a-z).
// .substring(2) removes the leading "0." from the string, leaving only the random part.
// Date.now() returns the current timestamp in milliseconds since January 1, 1970.
// .toString(36) converts the timestamp into a base-36 string, compacting the number 
// in to a shorter alphanumeric representation.