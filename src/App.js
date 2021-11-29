import Canvas from "./Canvas";

function App() {
  return (
    <>
      <p
        style={{
          position: "fixed",
          bottom: "0",
          left: "5px",
          color: "whitesmoke",
          fontSize: "10px",
        }}
      >
        Left click (touch) to rotate
        <br />
        Zoom
      </p>
      <Canvas />
    </>
  );
}

export default App;
