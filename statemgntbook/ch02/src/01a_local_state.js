const log = console.log.bind(console);

function createContainer() {
  let base = 1;

  const addBase = (n) => base + n;
  const changeBase = (b) => base = b;

  return { addBase, changeBase };
}

const { addBase, changeBase } = createContainer();

log(addBase(1));
//=> 2

changeBase(41);
log(addBase(1));
//=> 42

//
// This is not a singleton, and many different containers can be created
// and they all isolated from one another (unlike with a global,
// singleton state). Containers are more reusable.
//

//
// NOTE: although addBase() in a container is not a mathematically pure
// function, you can get the same result by calling addBase() if base is
// not changed (this characteristic is sometimes called idempotent).
//
