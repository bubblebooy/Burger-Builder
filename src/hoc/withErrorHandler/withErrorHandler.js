import React, { Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent) => {
  return class extends Component {
    componentDidMount
    render (){
      return (
        <>
          <Modal show>
            ERROR!!!!!!!!!!!!!!!!!!!!!!!
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  }
}

export default withErrorHandler
