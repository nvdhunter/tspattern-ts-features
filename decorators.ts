class Boat {
  color: string = "red";

  get formattedColort(): string {
    return `This boat color is ${this.color}`;
  }

  @logError("Something bad!")
  pilot(): void {
    throw new Error();
    console.log("swish");
  }
}

function logError(errorMessage: string) {
  return function (target: any, key: string, desc: PropertyDescriptor): void {
    const method = desc.value;

    desc.value = function () {
      try {
        method();
      } catch (e) {
        console.log(errorMessage);
      }
    };
  };
}

new Boat().pilot();
