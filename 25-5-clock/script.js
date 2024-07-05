import {
createSlice,
configureStore } from
"https://cdn.skypack.dev/@reduxjs/toolkit@1.4.0";
const { Provider, useSelector, useDispatch } = ReactRedux;
const { render } = ReactDOM;
const { useEffect, useRef } = React;

const SECONDS_IN_MINUTE = 60;
const MIN_LENGTH = 60;
const MAX_LENGTH = 3600;
const DEFAULT_SESSION_LENGTH = 1500;
const DEFAULT_BREAK_LENGTH = 300;

function clampLength(number) {
  return Math.min(Math.max(number, MIN_LENGTH), MAX_LENGTH);
}

const sessionLengthSlice = createSlice({
  name: "sessionLength",
  initialState: {
    value: DEFAULT_SESSION_LENGTH },

  reducers: {
    increment: state => {
      state.value = clampLength(state.value + SECONDS_IN_MINUTE);
    },
    decrement: state => {
      state.value = clampLength(state.value - SECONDS_IN_MINUTE);
    },
    set: (state, action) => {
      state.value = clampLength(action.payload);
    },
    reset: state => {
      state.value = DEFAULT_SESSION_LENGTH;
    } } });



const breakLengthSlice = createSlice({
  name: "breakLength",
  initialState: {
    value: DEFAULT_BREAK_LENGTH },

  reducers: {
    increment: state => {
      state.value = clampLength(state.value + SECONDS_IN_MINUTE);
    },
    decrement: state => {
      state.value = clampLength(state.value - SECONDS_IN_MINUTE);
    },
    set: (state, action) => {
      state.value = clampLength(action.payload);
    },
    reset: state => {
      state.value = DEFAULT_BREAK_LENGTH;
    } } });



const timeLeftSlice = createSlice({
  name: "timeLeft",
  initialState: {
    value: DEFAULT_SESSION_LENGTH },

  reducers: {
    decrement: state => {
      state.value = state.value - 1;
    },
    set: (state, action) => {
      state.value = action.payload;
    },
    reset: state => {
      state.value = DEFAULT_SESSION_LENGTH;
    } } });



const isBreakSlice = createSlice({
  name: "isBreak",
  initialState: {
    value: false },

  reducers: {
    toggle: state => {
      state.value = !state.value;
    },
    reset: state => {
      state.value = false;
    } } });



const isEnabledSlice = createSlice({
  name: "isEnabled",
  initialState: {
    value: false },

  reducers: {
    toggle: state => {
      state.value = !state.value;
    },
    reset: state => {
      state.value = false;
    } } });



const store = configureStore({
  reducer: {
    sessionLength: sessionLengthSlice.reducer,
    breakLength: breakLengthSlice.reducer,
    timeLeft: timeLeftSlice.reducer,
    isBreak: isBreakSlice.reducer,
    isEnabled: isEnabledSlice.reducer } });



function handleMouseDown(event) {
  event.target.classList.add("button-clicked");
}

function handleMouseUp(event) {
  event.target.classList.remove("button-clicked");
}

function SessionComponent() {
  const [sessionLength, timeLeft, isBreak, isEnabled] = useSelector(state => [
  state.sessionLength.value,
  state.timeLeft.value,
  state.isBreak.value,
  state.isEnabled.value]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isBreak) {
      dispatch(timeLeftSlice.actions.set(sessionLength));
    }
  }, [sessionLength]);

  function handleIncrement() {
    if (!isEnabled) {
      dispatch(sessionLengthSlice.actions.increment());
    }
  }

  function handleChange(event) {
    if (!isEnabled) {
      const parsedResult = parseInt(event.target.value);
      if (parsedResult) {
        dispatch(
        sessionLengthSlice.actions.set(parsedResult * SECONDS_IN_MINUTE));

      }
    }
  }

  function handleDecrement() {
    if (!isEnabled) {
      dispatch(sessionLengthSlice.actions.decrement());
    }
  }

  return /*#__PURE__*/(
    React.createElement("div", { class: "display-group" }, /*#__PURE__*/
    React.createElement("button", {
      id: "session-decrement",
      className: "button",
      onClick: handleDecrement,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp }, "-"), /*#__PURE__*/



    React.createElement("div", { className: "display" }, /*#__PURE__*/
    React.createElement("label", { id: "session-label", for: "session-length" },
    "Session length: "), /*#__PURE__*/

    React.createElement("input", {
      id: "session-length",
      type: "text",
      pattern: "\\d*",
      maxLength: 2,
      value: sessionLength / SECONDS_IN_MINUTE,
      onChange: handleChange })), /*#__PURE__*/


    React.createElement("button", {
      id: "session-increment",
      className: "button",
      onClick: handleIncrement,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp }, "+")));





}

function BreakComponent() {
  const [breakLength, timeLeft, isBreak, isEnabled] = useSelector(state => [
  state.breakLength.value,
  state.timeLeft.value,
  state.isBreak.value,
  state.isEnabled.value]);


  const dispatch = useDispatch();

  useEffect(() => {
    if (isBreak) {
      dispatch(timeLeftSlice.actions.set(breakLength));
    }
  }, [breakLength]);

  function handleIncrement() {
    if (!isEnabled) {
      dispatch(breakLengthSlice.actions.increment());
    }
  }

  function handleChange(event) {
    if (!isEnabled) {
      const parsedResult = parseInt(event.target.value);
      if (parsedResult) {
        dispatch(
        breakLengthSlice.actions.set(parsedResult * SECONDS_IN_MINUTE));

      }
    }
  }

  function handleDecrement() {
    if (!isEnabled) {
      dispatch(breakLengthSlice.actions.decrement());
    }
  }

  return /*#__PURE__*/(
    React.createElement("div", { class: "display-group" }, /*#__PURE__*/
    React.createElement("button", {
      id: "break-decrement",
      className: "button",
      onClick: handleDecrement,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp }, "-"), /*#__PURE__*/



    React.createElement("div", { className: "display" }, /*#__PURE__*/
    React.createElement("label", { id: "break-label", for: "break-length" },
    "Break length: "), /*#__PURE__*/

    React.createElement("input", {
      id: "break-length",
      type: "text",
      pattern: "\\d*",
      maxLength: 2,
      value: breakLength / SECONDS_IN_MINUTE,
      onChange: handleChange })),

    " ", /*#__PURE__*/
    React.createElement("button", {
      id: "break-increment",
      className: "button",
      onClick: handleIncrement,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp }, "+")));





}

function TimerComponent() {
  const beepAudio = useRef(null);
  const timer = useRef({});

  const [
  sessionLength,
  breakLength,
  isBreak,
  timeLeft,
  isEnabled] =
  useSelector(state => [
  state.sessionLength.value,
  state.breakLength.value,
  state.isBreak.value,
  state.timeLeft.value,
  state.isEnabled.value]);


  const dispatch = useDispatch();

  useEffect(() => {
    if (isEnabled) {
      timer.current = setInterval(() => {
        dispatch(timeLeftSlice.actions.decrement());
      }, 1000);
    } else {
      clearInterval(timer.current);
    }
  }, [isEnabled]);

  useEffect(() => {
    if (isEnabled && timeLeft <= 0) {
      dispatch(isBreakSlice.actions.toggle());
      beepAudio.current.play();
    }
  }, [timeLeft]);

  useEffect(() => {
    dispatch(timeLeftSlice.actions.set(isBreak ? breakLength : sessionLength));
  }, [isBreak]);

  function handleSwitch() {
    dispatch(isEnabledSlice.actions.toggle());
  }

  function handleReset() {
    dispatch(sessionLengthSlice.actions.reset());
    dispatch(breakLengthSlice.actions.reset());
    dispatch(isBreakSlice.actions.reset());
    dispatch(isEnabledSlice.actions.reset());
    dispatch(timeLeftSlice.actions.reset());
    beepAudio.current.pause();
    beepAudio.current.currentTime = 0;
  }

  const displayedValue = `${Math.floor(timeLeft / SECONDS_IN_MINUTE).
  toString().
  padStart(2, "0")}:${(timeLeft % SECONDS_IN_MINUTE).
  toString().
  padStart(2, "0")}`;

  function getLabel() {
    if (isEnabled) {
      return isBreak ? "Break time!" : "In session";
    } else {
      return `Press "Go" to begin\nPress "R" to reset`;
    }
  }

  return /*#__PURE__*/(
    React.createElement("div", { class: "display-group" }, /*#__PURE__*/
    React.createElement("audio", {
      id: "beep",
      src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav",
      ref: beepAudio }), /*#__PURE__*/

    React.createElement("button", {
      id: "start_stop",
      className: "button",
      onClick: handleSwitch,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp },

    "GO"), /*#__PURE__*/

    React.createElement("div", { id: "timer-display", className: "display" }, /*#__PURE__*/
    React.createElement("label", { id: "timer-label", for: "time-left" },
    getLabel()), /*#__PURE__*/

    React.createElement("div", { id: "time-left" }, displayedValue)), /*#__PURE__*/

    React.createElement("button", {
      id: "reset",
      className: "button",
      onClick: handleReset,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp }, "R")));





}

function App() {
  return /*#__PURE__*/(
    React.createElement("div", { id: "clock" }, /*#__PURE__*/
    React.createElement("div", { id: "panel" }, /*#__PURE__*/
    React.createElement(SessionComponent, null), /*#__PURE__*/
    React.createElement(TimerComponent, null), /*#__PURE__*/
    React.createElement(BreakComponent, null))));



}

render( /*#__PURE__*/
React.createElement(Provider, { store: store }, /*#__PURE__*/
React.createElement(App, null)),

document.getElementById("app"));