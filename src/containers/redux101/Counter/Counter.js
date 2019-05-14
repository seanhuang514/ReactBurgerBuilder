import React, { Component } from 'react';
import { connect } from 'react-redux'
import CounterControl from '../../../components/redux101/CounterControl/CounterControl';
import CounterOutput from '../../../components/redux101//CounterOutput/CounterOutput';
import * as actionType from '../../../store/redux101/actions'
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
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={() => this.props.onAddCounter(10)}  />
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubtractCounter(10)}  />
                <hr/>
                <button onClick={() => this.props.onStoreResult(this.props.counter)}>Store Result</button>
                <ul>
                  {
                    this.props.storedResults.map(result => {
                      return <li key={result.id} onClick={() => this.props.onDeleteResult(result.id)}>{result.value}</li>
                    })
                  }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
  console.log('[mapStateToProps]', state) // {counter: {counter: 0}, result: {results: Array(0)}}
  /* 
    當 combineReducers 把數個 reducer combine 在一起後
    取 state 的時候要多加一層設定在 combineReducers 的 key 
    const rootReducer = combineReducers({
      counter: counterReducer,
      result: resultReducer
    })
  */
  return {
    counter: state.counter.counter,
    storedResults: state.result.results
  }
}

// console.log('connect', connect(mapStateToProps)(Counter)) //Symbol(react.memo)

const mapDispatchToProps = dispatch => {
  return {
    /* 
      onIncrementCounter 是觸發 dispatch 的 function name
      這個 function 可以在 props裡面找到
      會回傳一個 dispatch 的 function並且帶著 type， 
     */
    onIncrementCounter: () => dispatch({ type: actionType.INCREMENT }),
    onDecrementCounter: () => dispatch({ type: actionType.DECREMENT }),
    onAddCounter: (value) => dispatch({ type: actionType.ADD, value: value }),
    onSubtractCounter: (value) => dispatch({ type: actionType.SUBTRACT, value: value }),
    onStoreResult: (result) => dispatch({ type: actionType.STORE_RESULT, result: result }),
    onDeleteResult: (resultId) => dispatch({ type: actionType.DELETE_RESULT, resultId: resultId })
  }
}

/* 
用 connect hoc 來連結 redux 跟 component 之間的溝通 
connect(mapStateToProps) 會 return 一個 function
然後再呼叫這個 function 一次，並且帶入要 export 的 component
之後就可以在 props 裡面取到需要的 state
*/

export default connect(mapStateToProps, mapDispatchToProps)(Counter);