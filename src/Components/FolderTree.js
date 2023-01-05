import React, { useCallback, useState } from "react";

export default function FolderTree({ list, handleActiveName }) {
  const [showChildren, setShowChildren] = useState(false);

  const handleShowChildren = useCallback(() => {
    setShowChildren(!showChildren);
  }, [showChildren]);

  const renderTree = (data) => {
    if (data?.child?.length) {
      return (
        <div>
          <div
            className="folder"
            onClick={() => {
              handleShowChildren();
              handleActiveName(data.name);
            }}
          >
            {data.name}
          </div>
          {showChildren && (
            <div className="children">
              <FolderTree
                handleActiveName={handleActiveName}
                list={data.child}
              />
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div onClick={() => handleActiveName(data.name)} className="file">
          {data.name}
        </div>
      );
    }
  };

  return (
    <div>
      {list.map((itr) => (
        <div key={itr.name}>{renderTree(itr)}</div>
      ))}
    </div>
  );
}
