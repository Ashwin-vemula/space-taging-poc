import React, { useEffect, useState } from "react";
import Actions from "./Components/Actions";
import FolderTree from "./Components/FolderTree";

const dummy = [
  {
    name: "ashwin",
    child: [
      {
        name: "ashwin1",
        child: [
          {
            name: "ashwin 2",
            child: [
              {
                name: "ashwin 3",
                child: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "vemula",
    child: [],
  },
];

export default function Nav() {
  const [dummyData, setDummydata] = useState(dummy);
  const [activeName, setActiveName] = useState(dummyData[0]?.name);

  const dummyAdd = (name, list = []) => {
    const data = list;
    data.forEach((itr) => {
      if (itr.name === activeName) {
        itr.child = [
          ...itr.child,
          {
            name,
            child: [],
          },
        ];
      } else {
        dummyAdd(name, itr.child);
      }
    });
    return data;
  };

  const handleAddFolder = (name) => {
    // console.log(dummyAdd(name, dummyData));
    setDummydata(JSON.parse(JSON.stringify(dummyAdd(name, dummyData))));
  };

  const dummyCheck = (list) => {
    const deletedData = list;
    deletedData.forEach((itr, index, arr) => {
      if (itr.name !== activeName && itr.child?.length) {
        itr.child = dummyCheck(itr.child);
      } else {
        if (itr.name === activeName) {
          arr.splice(index, 1);
        }
      }
    });
    return deletedData;
  };

  const handleDelete = () => {
    setDummydata(JSON.parse(JSON.stringify(dummyCheck(dummyData))));
  };

  return (
    <div className="section">
      <FolderTree handleActiveName={setActiveName} list={dummyData} />
      <Actions
        name={activeName}
        handleAdd={handleAddFolder}
        handleDelete={handleDelete}
      />
    </div>
  );
}
