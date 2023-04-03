import React from 'react';
import {useSearchParams} from 'react-router-dom';

function Payment(){
  const [params] = useSearchParams();
  const state = params.get('status');
  const refId = params.get('reference');
  return (
    <React.Fragment>
    <div>
      <h1>Payment {state}!</h1>
      {refId && <h5>Ref Id : {refId}</h5>}
    </div>
    </React.Fragment>
    )
}

export default Payment;