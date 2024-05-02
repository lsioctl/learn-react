
// use of IIFE and the module pattern
// Hooks will work only on a single component
// React must have another way to do with multiple component
// and closures must be hold by Component "id"
const MyReact = (() => {
  // returned function holds a closure on this variable
  let _state;

  return {
    // note: how to handle props (arguments of the function commponent ?)
    render: (componentFunc) => {
      const component = componentFunc();
      component.render();
      
      return component;
    },
    useState: (initState) => {
      // use initState only if _state is not already modified by a closure
      // TODO: protect from undefined initState ?
      _state = _state || initState

      function setState(new_state) {
        _state = new_state;
      }

      // _state is protected by the IIFE
      return [_state, setState];
    }
  }
})();


function Counter() {
  const [count, setCount] = MyReact.useState(0);

  return {
    click: () => {
      setCount(count + 1);
    },
    render: () => console.log(
      {
        count,
      }
    )
  }
}

let App = MyReact.render(Counter);

App.click();

App = MyReact.render(Counter);

App.click();

App = MyReact.render(Counter);

