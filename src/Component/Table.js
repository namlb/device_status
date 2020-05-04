import React from 'react';


const Table = ({ props }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>STT</th>
          <th>NodeId</th>
          <th>PM10</th>
          <th>PM2.5</th>
          <th>Humidity</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
      {(props.nodes.length > 0) ? props.nodes.map( (node, index) => {
           if(node.Class === props.class || props.class ==="all"){
            return (
              <tr key={ index } class={node.Class}>
                <td>{index+1}</td>
                <td class="text-left">{ node.NodeId }</td>
                <td>{ node.PM10}</td>
                <td>{ node.PM2_5}</td>
                <td>{ node.Hum }</td>
                <td> { node.Status} </td>
              </tr>
            )
           }
         }) : <tr><td colSpan="5">Loading...</td></tr> }
      </tbody>
    </table>
  );
}

export default Table