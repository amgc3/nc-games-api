const { keyReplacer } = require("../db/utils/data-manipulation");

describe("keyReplacer", () => {
  test("returns a new empty object when passed an empty object", () => {
    const testObject = {};
    expect(keyReplacer(testObject)).toEqual({});
    expect(keyReplacer(testObject)).not.toBe(testObject);
  });
  test("should return new object with keyToReplace replaced with newKey", () => {
    const testObject = {
      body: "I loved this game too!",
      belongs_to: "Jenga",
      created_by: "bainesface",
      votes: 16,
      created_at: 1511354613389,
    };
    const keyToReplace = "created_by";
    const newKey = "author";
    expect(keyReplacer(testObject, keyToReplace, newKey)).toEqual({
      body: "I loved this game too!",
      belongs_to: "Jenga",
      author: "bainesface",
      votes: 16,
      created_at: 1511354613389,
    });
    expect(keyReplacer(testObject)).not.toBe(testObject);
  });
});
