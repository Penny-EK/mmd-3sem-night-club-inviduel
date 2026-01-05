export default function CornerElem({topLeft, bottomRight, className = ""}) {
  return (
    <>
    {topLeft && (
      <div
        className={`bg-accent absolute top-0 left-0 aspect-square [clip-path:polygon(0_0,100%_0,0_100%)] ${className}`}
        aria-hidden="true"
      />
    )}
    {bottomRight && (
      <div
        className={`bg-accent absolute right-0 bottom-0 aspect-square [clip-path:polygon(100%_0,100%_100%,0_100%)] ${className}`}
        aria-hidden="true"
      />
    )}
    </>
  )
}


/*
export const cornerElem = ({cornerPos}) => {
  
  const corners = {
    "top-left": "[before:content-[''] before:bg-accent before:absolute before:top-0 before:left-0 before:aspect-square before:w-11 before:[clip-path:polygon(0_0,100%_0,0_100%)]]",
    "bottom-right": "[after:content-[''] after:bg-accent after:absolute after:top-0 after:left-0 after:aspect-square after:w-11 after:[clip-path:polygon(0_0,100%_0,0_100%)]]"
  }
  


  return ( `relative ${corners[cornerPos]}` );
}
*/
/*

export default function CornerAccent({ corners = [] }) {
  const configs = {
    "top-left": "top-0 left-0 [clip-path:polygon(0_0,100%_0,0_100%)]",
    "top-right": "top-0 right-0 [clip-path:polygon(100%_0,100%_100%,0_0)]",
    "bottom-left": "bottom-0 left-0 [clip-path:polygon(0_0,0_100%,100%_100%)]",
    "bottom-right": "bottom-0 right-0 [clip-path:polygon(100%_0,100%_100%,0_100%)]"
  };

  return (
    <>
      {corners.map((corner) => (
        <div
          key={corner}
          className={`bg-accent absolute aspect-square w-11 ${configs[corner]}`}
          aria-hidden="true"
        />
      ))}
    </>
  );
}

export const cornerAccent = (position) => {
  const positions = {
    "top-left": "[--corner:polygon(0_0,100%_0,0_100%)] before:top-0 before:left-0",
    "bottom-right": "[--corner:polygon(100%_0,100%_100%,0_100%)] before:bottom-0 before:right-0"
  };
  return `relative before:content-[''] before:bg-accent before:absolute before:aspect-square before:w-11 before:[clip-path:var(--corner)] ${positions[position]}`;
};

<div className={cornerAccent("top-left")}>
</div>

*/