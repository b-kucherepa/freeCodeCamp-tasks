const drumPads = [
{
  name: "Heater 1",
  hotkey: "Q",
  sample:
  "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3" },

{
  name: "Heater 2",
  hotkey: "W",
  sample:
  "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3" },

{
  name: "Heater 3",
  hotkey: "E",
  sample:
  "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3" },

{
  name: "Heater 4",
  hotkey: "A",
  sample:
  "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3" },

{
  name: "Clap",
  hotkey: "S",
  sample:
  "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3" },

{
  name: "Open-HH",
  hotkey: "D",
  sample:
  "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3" },

{
  name: "Kick-n'-Hat",
  hotkey: "Z",
  sample:
  "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3" },

{
  name: "Kick",
  hotkey: "X",
  sample:
  "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3" },

{
  name: "Closed-HH",
  hotkey: "C",
  sample:
  "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3" }];



const DisplayContext = React.createContext({
  value: null,
  setValue: () => {} });


function Title(props) {
  return /*#__PURE__*/React.createElement("h1", null, props.title);
}

function Display(props) {
  const display = React.useContext(DisplayContext);
  return /*#__PURE__*/React.createElement("div", { id: "display" }, display.value);
}

function DrumPad(props) {
  const display = React.useContext(DisplayContext);

  const audioElementRef = React.useRef(null);
  const buttonElementRef = React.useRef(null);

  function play() {
    audioElementRef.current.currentTime = 0;
    audioElementRef.current.play();
    display.setValue(props.name);
  }

  function handleMouseDown() {
    buttonElementRef.current.classList.add("drum-pad-clicked");
    play();
  }

  function handleMouseUp() {
    buttonElementRef.current.classList.remove("drum-pad-clicked");
  }

  function handleKeyDown(event) {
    if (event.key.toUpperCase() === props.hotkey) {
      buttonElementRef.current.focus();
      buttonElementRef.current.classList.add("drum-pad-clicked");
      play();
    }
  }

  function handleKeyUp(event) {
    if (event.key.toUpperCase() === props.hotkey) {
      buttonElementRef.current.classList.remove("drum-pad-clicked");
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
  }, []);

  return /*#__PURE__*/(
    React.createElement("button", {
      id: `drum-pad-${props.hotkey}`,
      class: "drum-pad",
      ref: buttonElementRef,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp },

    props.hotkey, /*#__PURE__*/

    React.createElement("audio", {
      id: props.hotkey,
      className: "clip",
      src: props.sample,
      ref: audioElementRef })));



}

function App() {
  const [displayState, setDisplayState] = React.useState(
  "Click a pad / press a key");


  return /*#__PURE__*/(
    React.createElement(DisplayContext.Provider, {
      value: { value: displayState, setValue: setDisplayState } }, /*#__PURE__*/

    React.createElement("div", { id: "drum-machine" }, /*#__PURE__*/
    React.createElement(Display, null), /*#__PURE__*/
    React.createElement("div", { id: "pad-panel" },
    drumPads.map(pad => {
      return /*#__PURE__*/(
        React.createElement(DrumPad, {
          name: pad.name,
          hotkey: pad.hotkey,
          sample: pad.sample }));


    })))));




}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));