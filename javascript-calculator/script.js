const CoreContext = React.createContext({});

function Title(props) {
  return /*#__PURE__*/React.createElement("h1", null, props.title);
}

function Display(props) {
  const core = React.useContext(CoreContext);
  return /*#__PURE__*/(
    React.createElement("div", { id: "display" },
    core.operator,
    core.accumulator));


}

function PanelButton(props) {
  const core = React.useContext(CoreContext);

  const buttonElementRef = React.useRef(null);

  function handleClick() {
    core.input(props.name);
  }

  function handleMouseDown() {
    buttonElementRef.current.classList.add("panel-button-clicked");
  }

  function handleMouseUp() {
    buttonElementRef.current.classList.remove("panel-button-clicked");
  }

  function handleKeyDown(event) {
    if (event.key.toUpperCase() === props.hotkey) {
      buttonElementRef.current.focus();
      buttonElementRef.current.classList.add("panel-button-clicked");
      buttonElementRef.current.click();
    }
  }

  function handleKeyUp(event) {
    if (event.key.toUpperCase() === props.hotkey) {
      buttonElementRef.current.classList.remove("panel-button-clicked");
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [props]);

  return /*#__PURE__*/(
    React.createElement("button", {
      id: props.id,
      class: "panel-button",
      ref: buttonElementRef,
      onClick: handleClick //the tests need that
      , onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp },

    props.name));


}

function Panel() {
  const core = React.useContext(CoreContext);

  return /*#__PURE__*/(
    React.createElement("div", { id: "panel" },
    core.buttons.map(button => {
      return /*#__PURE__*/(
        React.createElement(PanelButton, {
          id: button.id,
          name: button.name,
          hotkey: button.hotkey }));


    })));


}

function ArithmeticCore(props) {
  const DIGITAL_BASE = 10;
  const DIGIT_LIMIT = 20;
  const DIGIT_LIMIT_MESSAGE = "DIGIT LIMIT MET";
  const [accumulator, setAccumulator] = React.useState("0");
  const [memory, setMemory] = React.useState("0");
  const [operator, setOperator] = React.useState("");

  console.log(
  "accumulator:",
  accumulator,
  "memory:",
  memory,
  "operator:",
  operator);


  function calculate(accumulator, memory, operator) {
    const firstOperand = parseFloat(memory);
    const secondOperand = parseFloat(accumulator);
    let result;
    switch (operator) {
      case "+":
        result = firstOperand + secondOperand;
        break;
      case "-":
        result = firstOperand - secondOperand;
        break;
      case "×":
        result = firstOperand * secondOperand;
        break;
      case "÷":
        result = firstOperand / secondOperand;
        break;
      default:
        throw "No such operation";}

    if (result.toString().length < DIGIT_LIMIT) {
      return result.toString();
    } else {
      let precision = 20;
      while (result.toPrecision(precision).toString().length > DIGIT_LIMIT) {
        precision--;
      }
      return result.toPrecision(precision).toString();
    }
  }

  function handleInput(input) {
    let newAccumulator = accumulator;
    let newMemory = memory;
    let newOperator = operator;

    if (newAccumulator === DIGIT_LIMIT_MESSAGE && input !== "AC") {
      return;
    }

    switch (input) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        if (newAccumulator.length + newOperator.length >= DIGIT_LIMIT) {
          const oldAccumulator = newAccumulator;
          const oldOperator = setOperator;

          setAccumulator(DIGIT_LIMIT_MESSAGE);
          setOperator("");

          setTimeout(() => {
            setAccumulator(oldAccumulator);
            setOperator(oldOperator);
          }, 1500);
          return;
        }

        if (newAccumulator === "0") {
          newAccumulator = input;
        } else if (newAccumulator === "-0") {
          newAccumulator = "-" + input;
        } else {
          newAccumulator += input;
        }
        break;
      case ".":
        if (!newAccumulator.includes(".")) {
          newAccumulator += ".";
        }
        break;
      case "+":
      case "-":
      case "×":
      case "÷":
        if (newAccumulator === "") {
          if (input === "-") {
            newAccumulator = input;
          } else {
            newOperator = input;
          }
        } else if (newAccumulator === "-") {
          newAccumulator = "";
          newOperator = input;
        } else {
          if (newAccumulator.endsWith(".")) {
            newAccumulator = newAccumulator.replace(".", "");
          }

          if (newOperator !== "") {
            newAccumulator = calculate(newAccumulator, newMemory, newOperator);
          }

          newMemory = newAccumulator;
          newAccumulator = "";
          newOperator = input;
        }

        break; //3 + 5 * 6 - 2 / 4 = 32.5 or 11.5
      case "=":
        if (newOperator !== "") {
          if (newAccumulator.endsWith(".")) {
            newAccumulator = newAccumulator.replace(".", "");
          }

          newAccumulator = calculate(newAccumulator, newMemory, newOperator);
          newMemory = "0";
          newOperator = "";
        }
        break;
      case "AC":
        newAccumulator = "0";
        newMemory = "0";
        newOperator = "";
        break;}

    setAccumulator(newAccumulator);
    setMemory(newMemory);
    setOperator(newOperator);
  }

  const buttons = [
  {
    id: "zero",
    name: "0",
    hotkey: "0" },

  {
    id: "one",
    name: "1",
    hotkey: "1" },

  {
    id: "two",
    name: "2",
    hotkey: "2" },

  {
    id: "three",
    name: "3",
    hotkey: "3" },

  {
    id: "four",
    name: "4",
    hotkey: "4" },

  {
    id: "five",
    name: "5",
    hotkey: "5" },

  {
    id: "six",
    name: "6",
    hotkey: "6" },

  {
    id: "seven",
    name: "7",
    hotkey: "7" },

  {
    id: "eight",
    name: "8",
    hotkey: "8" },

  {
    id: "nine",
    name: "9",
    hotkey: "9" },

  {
    id: "add",
    name: "+",
    hotkey: "+" },

  {
    id: "subtract",
    name: "-",
    hotkey: "-" },

  {
    id: "multiply",
    name: "×",
    hotkey: "*" },

  {
    id: "divide",
    name: "÷",
    hotkey: "/" },

  {
    id: "decimal",
    name: ".",
    hotkey: "." },

  {
    id: "equals",
    name: "=",
    hotkey: "ENTER" },

  {
    id: "clear",
    name: "AC",
    hotkey: "C" }];



  return /*#__PURE__*/(
    React.createElement(CoreContext.Provider, {
      value: {
        accumulator: accumulator,
        operator: operator,
        buttons: buttons,
        input: handleInput } },


    props.children));


}

function App() {
  return /*#__PURE__*/(
    React.createElement("div", { id: "calc-machine" }, /*#__PURE__*/
    React.createElement(ArithmeticCore, null, /*#__PURE__*/
    React.createElement(Display, null), /*#__PURE__*/
    React.createElement(Panel, null))));



}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));