import React from 'react';


const Table = ({ props }) => {
  let loading = (props.activeNumber+props.activeBeforeNumber+props.inactive !== props.nodes.length)
  || props.nodes.length==0
  return (
    <div>
        { loading == true ? <div>...</div> : 
        <div>
          <span class="span-info">Total: {props.nodes.length}</span>
          <span class="span-info">Active: {props.activeNumber}</span>
          <span class="span-info">Active Before: {props.activeBeforeNumber}</span>
          <span class="span-info">Inactive: {props.inactive}</span>
        </div>
        }
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
        {(props.nodes.length > 0 && loading==false) ? props.nodes.map( (node, index) => {
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
    </div>
    
  );
}

export default Table