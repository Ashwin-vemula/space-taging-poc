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
  const [zoom, setZoom] = useState("");
  // const [parent, setParent] = useState({});
  let parent;
  let dragCoords = {
    x: 0,
    y: 0,
  };

  // console.log(markers, zoom);

  const marker = ({ itemNumber }) => (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        height: "20px",
        width: "20px",
        borderRadius: "50%",
      }}
      draggable="true"
      onDragStart={({ target }) => {
        const data = target.getBoundingClientRect();
        console.log({ data }, "start");
        // debugger;
        // setParent({
        //   x: target.parentElement.parentElement.offsetWidth,
        //   y: target.parentElement.parentElement.offsetHeight,
        //   item: +target.innerHTML,
        // });
        parent = {
          x: target.parentElement.parentElement.offsetWidth,
          y: target.parentElement.parentElement.offsetHeight,
          item: +target.innerHTML,
        };
      }}
      onDragEnd={({ target }) => {
        const data = target.getBoundingClientRect();
        console.log({ data }, "end");
        // debugger;
      }}
    >
      {itemNumber}
    </div>
  );

  return (
    <div>
      <select onChange={({ target }) => setZoom(target.value)}>
        <option value="10">10%</option>
        <option value="20">20%</option>
        <option value="30">30%</option>
        <option value="70">70%</option>
      </select>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            width: "40%",
          }}
        >
          jvkdfvdk
        </div>
        <div
          className="App"
          onDrop={({ target }) => {
            const data = target.getBoundingClientRect();
            // debugger;
            let yo = markers;
            const { x, y, item } = parent;

            const x1px = x / 100;
            const y1px = y / 100;
            const sib =
              target.parentElement.parentElement.previousElementSibling.getBoundingClientRect()
                .width;
            // debugger;
            console.log(sib);

            yo.splice(item, 1, {
              left: (dragCoords.x - sib) / x1px,
              top: dragCoords.y / y1px - 2.5,
            });
            setMarkers([...yo]);
            console.log({ yo, dragCoords });
          }}
          onDragOver={(e) => {
            e.preventDefault();

            dragCoords = {
              x: e.clientX,
              y: e.clientY,
            };
            // console.log(e);
            // debugger;
          }}
        >
          <ImageMarker
            src={Image}
            markers={markers}
            onAddMarker={(marker) => setMarkers([...markers, marker])}
            markerComponent={marker}
          />
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
