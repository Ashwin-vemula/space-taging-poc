import logo from "./logo.svg";
import "./App.css";
import Nav from "./Nav";
import ImageMarker, { Marker } from "react-image-marker";
import { useState } from "react";
import Image from "./space.png";

function App() {
  const [markers, setMarkers] = useState([
    {
      top: 10, //10% of the image relative size from top
      left: 50, //50% of the image relative size from left
    },
  ]);
  const [zoom, setZoom] = useState(1);
  const [showDropDown, setShowDropdown] = useState(false);
  const [activeNumber, setActiveNumber] = useState(0);
  // const [parent, setParent] = useState({});
  let parent;
  let dragCoords = {
    x: 0,
    y: 0,
  };

  const marker = ({ itemNumber }) => {
    return (
      <div
        style={{
          backgroundColor: "#000",
          color: "#fff",
          height: "20px",
          width: "20px",
          borderRadius: "50%",
          // position: "relative",
        }}
        draggable="true"
        onDragStart={({ target }) => {
          const data = target.getBoundingClientRect();
          console.log({ data }, "start");
          parent = {
            x: target.parentElement.parentElement.offsetWidth,
            y: target.parentElement.parentElement.offsetHeight,
            item: +target.textContent,
          };
        }}
        onDragEnd={({ target }) => {
          const data = target.getBoundingClientRect();
          console.log({ data }, "end");
        }}
        onClick={() => {
          setShowDropdown((prev) => !prev);
          setActiveNumber(itemNumber);
        }}
      >
        <div>{itemNumber}</div>
        {showDropDown && activeNumber === itemNumber && (
          <div
            style={{
              position: "absolute",
            }}
          >
            <select onChange={() => setShowDropdown(false)}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <div
        style={{
          marginBottom: "20px",
        }}
      >
        Information: click on the element to see the dropdown, and after
        selecting a value, the dropdown will close.
      </div>
      <div>
        <div>Zoom here</div>
        <button onClick={() => setZoom(zoom + 0.1)}>+</button>
        <button onClick={() => setZoom(zoom - 0.1)}>-</button>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            width: "800px",
            height: "400px",
            overflow: "scroll",
          }}
        >
          <div
            className="App"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "0 0",
            }}
            onDrop={({ target }) => {
              const data = target.getBoundingClientRect();
              // debugger;
              let yo = markers;
              const { x, y, item } = parent;

              const x1px = x / 100;
              const y1px = y / 100;

              const sib = 40;
              // target.parentElement.parentElement.previousElementSibling.getBoundingClientRect()
              //   .width;

              yo.splice(item, 1, {
                left: (dragCoords.x - sib) / x1px,
                top: dragCoords.y / y1px - 27.5,
              });
              setMarkers([...yo]);
              console.log({ yo, parent, dragCoords, x1px, y1px });
            }}
            onDragOver={(e) => {
              e.preventDefault();

              dragCoords = {
                x: e.clientX,
                y: e.clientY,
              };
            }}
          >
            <ImageMarker
              src={Image}
              markers={markers}
              onAddMarker={(marker) => setMarkers([...markers, marker])}
              markerComponent={marker}
            />
          </div>
        </div>

        {/* <div
          style={{
            width: "20%",
          }}
        >
          jvkdfvdknkbbngjkfnbd
        </div> */}
      </div>
    </div>
  );
}

export default App;
