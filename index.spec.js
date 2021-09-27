import Cat from "./cat";

describe("Cat", () => {
  let cat = null;

  beforeEach(() => {
    cat = new Cat("Milu");
  });

  test("produceSound", () => {
    expect(cat.produceSound()).toBe("Milu meows.");
  });

  test("if the cat is annoyed", () => {
    expect(cat.mood).toBe("Milu is chill. Annoyance Level: 0.");
  });

  describe("provoke", () => {
    test("provoking the cat", () => {
      cat.provoke();
      expect(cat.mood).toBe("Milu is chill. Annoyance Level: 1.");
    });

    describe("when annoyed", () => {
      beforeEach(() => {
        cat.notifyOwner = jest.fn();
        cat.getAnnoyanceLevel = jest.fn().mockReturnValue(5);

        cat.provoke();
      });

      test("is annoyed", () => {
        expect(cat.mood).toBe("Milu is angry. Annoyance Level: 5.");
      });

      test("notification", () => {
        expect(cat.notifyOwner).toHaveBeenCalledWith(
          "/cats/notify",
          "Milu is angry. Annoyance Level: 5."
        );
      });
    });
  });
});
