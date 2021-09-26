const https = require('https')

class Cat {
  annoyanceLevel = 0;

  constructor(name) {
    this.name = name;
    this.mood = 'chill';
  }

  produceSound() {
    return `${this.name} meows.`;
  }

  play() {
    this.mood = 'playful';

    this.annoyanceLevel = 0;
  }

  sleep() {
    this.mood = 'sleepy';

    this.annoyanceLevel = 0;
  }

  notifyOwner() {
    alert('Your cat is annoyed!');
    ('')
  }

  provoke() {
    this.annoyanceLevel++;

    if (this.annoyanceLevel >= 5) {
      this.mood = 'angry';

      notifyOwner();
    }
  }

  set mood(newMood) {
    this._mood = newMood;
  }

  get mood() {
    return `${this.name} is ${this._mood}. Annoyance Level: ${this.annoyanceLevel}.`;
  }
}

module.export = Cat;

// const cat = new Cat('Milu');
// // cat.play();
// // cat.provoke();
// // cat.provoke();
// // cat.provoke();
// // cat.provoke();
// // cat.provoke();
// // cat.provoke();
// // cat.sleep();
// console.log(cat.mood);
