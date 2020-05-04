import React from 'react';

const Mark = () => {
    let blocks = []
    for(var i = 0; i<24; i++) {
        blocks.push(<div class="block mark-hour">{i}</div>)
    }
    return (
      <div>{blocks}</div>
    );
  }
  
  export default Mark