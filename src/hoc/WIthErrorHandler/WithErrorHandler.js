import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/ui/Model/Modal';


const WithErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    constructor(){
      super()
      this.requestInterceptor = axios.interceptors.request.use(request => {
        this.setState({ error: null });

        return request
      })
      this.responseInterceptor = axios.interceptors.response.use(response => response, error => {
        this.setState({ error: error });
      })
      
    }

    componentWillUnmount(){
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    modalCloseHandler = () => {
      this.setState({ error: null });
    }

    render () {
      console.log('WithErrorHandler', this.props);

      return (
        <Aux>
          <Modal show={this.state.error} modalClose={this.modalCloseHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      )
    }
  }
}

export default WithErrorHandler;