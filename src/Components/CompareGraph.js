import React from 'react';

export default function CompareGraph(props) {
    return(
        <div>
          {props.selectedFrameworks.map(framework => {
              return <p>{framework}</p>;
          })}
        </div>
    )
}