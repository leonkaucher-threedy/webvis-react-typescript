

function About(): JSX.Element {
  return (
      <div>
        <h1>About this app</h1>
        <div style={{display: "flex", justifyContent: "center"}}>
          <p className="about">
            This app demonstrates how to integrate webvis into the React framework using typescript,
            functional components and hooks. To keep an instance of webvis alive and accessible throughout
            the entire application, it is created in <code>App.tsx</code> and
            stays in the DOM, and is hidden if switched to other pages. Removing webvis from the DOM also
            releases all allocated resources on the GPU as the get canvas gets destroyed.
          </p>
        </div>
      </div>
  );
}

export default About;
