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

  notifyOwner(path, message) {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(message)
      }
    };

    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);

      res.on('data', (d) => {
        process.stdout.write(d);
      });
    });

    req.on('error', (error) => {
      console.error(error);
    });

    req.write(message);
    req.end();
  }

  getAnnoyanceLevel() {
    return this.annoyanceLevel;
  }

  provoke() {
    this.annoyanceLevel++;

    if (this.getAnnoyanceLevel() >= 5) {
      this.mood = 'angry';

      this.notifyOwner('/cats/notify', this.mood)
    }
  }

  set mood(newMood) {
    this._mood = newMood;
  }

  get mood() {
    return `${this.name} is ${this._mood}. Annoyance Level: ${this.getAnnoyanceLevel()}.`;
  }
}

describe("Cat", () => {
  let cat = null;

  beforeEach(() => {
    cat = new Cat('Milu');
  });

  test("produceSound", () => {
    expect(cat.produceSound()).toBe('Milu meows.');
  })

  test("if the cat is annoyed", () => {
    expect(cat.mood).toBe('Milu is chill. Annoyance Level: 0.');
  });

  describe("provoke", () => {
    test("provoking the cat", () => {
      cat.provoke();
      expect(cat.mood).toBe('Milu is chill. Annoyance Level: 1.');
    });

    describe("when annoyed", () => {
      beforeEach(() => {
        cat.notifyOwner = jest.fn();
        cat.getAnnoyanceLevel = jest.fn().mockReturnValue(5);

        cat.provoke();
      });

      test("is annoyed", () => {
        expect(cat.mood).toBe('Milu is angry. Annoyance Level: 5.');
      });

      test("notification", () => {
        expect(cat.notifyOwner).toHaveBeenCalledWith('/cats/notify', 'Milu is angry. Annoyance Level: 5.');
      });
    });
  });
});
