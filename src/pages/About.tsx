

function About(): JSX.Element {
  return (
      <div>
        <h1>About this app</h1>
        <p>
          This app demonstrates how to integrate webvis into a React/Typescript
          project. To keep an instance of webvis alive and accessible throughout
          the entire application, it is created in <code>App.tsx</code> and
          hidden from the DOM based on the page route.
        </p>
      </div>
  );
}

export default About;
