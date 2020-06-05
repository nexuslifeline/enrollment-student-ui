export class Enum {
  constructor(enums) {
    this.enums = enums;
    this.values = Object.values(enums);
    for (const prop in enums) {
      if (enums.hasOwnProperty(prop)) {
        this[prop] = enums[prop];
      }
    }
  }

  getEnum = (id) => {
    return this.values.find((e) => e.id === id);
  };

  getName = (id) => {
    const en = this.values.find((e) => e.id === id);
    if (en) {
      return en.name;
    }
    return null;
  };

  getEnumByValue = (value, fromKey) => {
    return this.values.find((e) => e[fromKey || 'name'] === value);
  };
}

export const StudentTypes = new Enum({
  REGULAR: { id: 1, name: 'Regular' },
  IRREGULAR: { id: 1, name: 'Irregular' }
});

export const StudentCategories = new Enum({
  NEW: { id: 1, name: 'New Student' },
  OLD: { id: 1, name: 'Old Student' }
});

export const SchoolCategories = new Enum({
  PRE_SCHOOL: { id: 1, name: 'Pre-School' },
  PRIMARY_SCHOOL: { id: 2, name: 'Primary School' },
  JUNIOR_HIGH_SCHOOL: { id: 3, name: 'Junior High School' },
  SENIOR_HIGH_SCHOOL: { id: 4, name: 'Senior High School' },
  COLLEGE: { id: 5, name: 'College' },
  GRADUATE_SCHOOL: { id: 6, name: 'Graduate School' }
});