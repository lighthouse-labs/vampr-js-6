class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    // let num = 0;
    // let vamp = this;
    // while (vamp.creator) {
    //   vamp = vamp.creator;
    //   num++;
    // }
    // return num;

    if (!this.creator) {
      return 0;
    }
    return 1 + this.creator.numberOfVampiresFromOriginal;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/
  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

    //if both are the same vamp return that vamp
    if (this.name === vampire.name) {
      return vampire;
    }

    let vampire1 = vampire;
    let vampire2 = this;

    if (this.isMoreSeniorThan(vampire)) {
      vampire1 = this;
      vampire2 = vampire;
    }

    //if senior vamp is the root vamp return root vamp
    if (!vampire1.creator) {
      return this;
    }

    //if senior vamp is the creator of junior, return the senior
    if (vampire2.creator.name === vampire1.name) {
      return vampire1;
    }

    //if both vamp have same creator return the creator
    if (vampire1.creator.name === vampire2.creator.name) {
      return vampire1.creator;
    }

    //if junior vamp is not in the same row, bring the vamp2 up with recursion
    return vampire2.creator.closestCommonAncestor(vampire1);
  }
}

module.exports = Vampire;

