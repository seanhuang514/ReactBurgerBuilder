import React, { Component } from 'react';
import { connect } from 'react-redux'
import CounterControl from '../../../components/redux101/CounterControl/CounterControl';
import CounterOutput from '../../../components/redux101//CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
      console.log('render', this.props) // {counter: 1, onIncrementCounter: ƒ}
        return (
            <div>
                <CounterOutput value={this.props.counter} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={() => this.counterChangedHandler( 'dec' )}  />
                <CounterControl label="Add 5" clicked={() => this.counterChangedHandler( 'add', 5 )}  />
                <CounterControl label="Subtract 5" clicked={() => this.counterChangedHandler( 'sub', 5 )}  />
            </div>
        );
    }
}

const mapStateToProps = state => {
  console.log('[mapStateToProps]', state) // {counter: 0}
  return {
    counter: state.counter
  }
}

console.log('connect', connect(mapStateToProps)(Counter)) //Symbol(react.memo)

/* 
用 connect hoc 來連結 redux 跟 component 之間的溝通 
connect(mapStateToProps) 會 return 一個 function
然後再呼叫這個 function 一次，並且帶入要 export 的 component
之後就可以在 props 裡面取到需要的 state
*/

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({ type: 'INCREMENT' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);