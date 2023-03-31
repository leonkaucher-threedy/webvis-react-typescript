

function About(): JSX.Element {
  return (
      <div>
        <h1>About this app</h1>
        <div style={{display: "flex", justifyContent: "center"}}>
          <p className="about">
            This app demonstrates how to integrate webvis into the React framework using TypeScript,
            functional components and hooks. To keep an instance of webvis alive and accessible throughout
            the entire application, it stays in the DOM, and is hidden via CSS if switched to other pages.
            Removing webvis from the DOM would release all allocated resources on the GPU as the get canvas gets destroyed.
            
          </p>
        </div>
      </div>
  );
}

export default About;
