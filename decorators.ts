@classDecorator
class Boat {
  @testDecorator
  color: string = "red";

  @testDecorator
  get formattedColort(): string {
    return `This boat color is ${this.color}`;
  }

  @logError("Something bad!")
  pilot(
    @parameterDecorator speed: string,
    @parameterDecorator generateWake: boolean
  ): void {
    if (speed === "fast") {
      console.log("swish");
    } else {
      console.log("nothing");
    }
  }
}

function classDecorator(constructor: typeof Boat) {
  console.log(constructor);
}

function parameterDecorator(target: any, key: string, index: number) {
  console.log(key, index);
}

function testDecorator(target: any, key: string): void {
  console.log("Key: ", key);
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
