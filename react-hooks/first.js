function useState(initState) {
  // returned functions hold a closure on this variable
  let _state = initState;

  function setState(new_state) {
    _state = new_state;
  }

  // getState is not a getter function on React, but
  // this is simple enough to start
  function getState() {
    return _state;
  }

  return [getState, setState];
}


function Counter() {
  const [getState, setState] = useState(0);

  return {
    click: () => {
      let count = getState();
      
      setState(count + 1);
    },
    render: () => console.log(
      {
        count: getState(),
      }
    )
  }
}

// This disturbs me as it is not what I understand how React functionnal
// components works: I think they are called at each render
// It seems it will be solved next in the article (second.js)
const counter = Counter();

counter.render();
counter.click();

counter.render();
counter.click();

counter.render();
counter.click();
