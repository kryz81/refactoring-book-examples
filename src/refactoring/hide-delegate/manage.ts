export class Department {
  constructor(private chargeCode: string, private manager: string) {}

  getChargeCode() {
    return this.chargeCode;
  }

  setChargeCode(chargeCode: string) {
    this.chargeCode = chargeCode;
  }

  getManager() {
    return this.manager;
  }

  setManager(manager: string) {
    this.manager = manager;
  }
}

// before refactoring

export class Person {
  constructor(private name: string, private department: Department) {}

  getName() {
    return this.name;
  }

  getDepartment() {
    return this.department;
  }

  setDepartment(department: Department) {
    this.department = department;
  }
}

// after refactoring

export class Person_Refactored {
  constructor(private name: string, private department: Department) {}

  getName() {
    return this.name;
  }

  setDepartment(department: Department) {
    this.department = department;
  }

  getManager() {
    return this.department.getManager();
  }
}
