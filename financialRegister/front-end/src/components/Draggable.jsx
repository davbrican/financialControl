import React, { useState } from 'react';
 
function MyComponent() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
 
  const handleDragEnd = (event) => {
    setX(event.clientX);
    setY(event.clientY);
  };
 
  return (
    <div
      draggable
      onDragEnd={handleDragEnd}
      style={{
        position: "absolute",
        left: x,
        top: y
      }}
    >
      Drag me!
    </div>
  );
}
 
export default MyComponent;