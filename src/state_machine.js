function StateMachine(){
    this.stateMachine = true; // for debug, state machine is attached
    this.state = false; // no state set yet
};
StateMachine.prototype.handleEvent = function(eventName){
    // if the before event function returns false, stop (return false)
    // if the function exists, AND teh function returns returns false, return false
    if((typeof(this.beforeEvent) != 'undefined') && (this.beforeEvent.call(this, eventName) == false)) return false;
    var event = this.states[this.state][eventName];
    if(typeof(event) === undefined) return false;
    if(typeof(event) === String) return this.changeState.apply(this, arguments); // Go to that state
    if(typeof(event) == 'function'){
        var result = event.apply(this, Array.prototype.slice.call(arguments, 1)); // Pass args to function
        if(typeof(result) === String) return this.changeState.apply(this); // Go to that state
    }
    if(typeof(this.afterEvent) != 'undefined') this.afterEvent.call(this, eventName);
    return this;
}
StateMachine.prototype.changeState = function(newState){
    var oldState = this.state;
    if((typeof(this.beforeStateChange) != 'undefined') && (this.beforeStateChange.call(this, newState, oldState) == false)) return false;
    if(oldState == newState) return this; // already there, not going to change to it
    if(!this.states[newState]) return false;
    if(oldState) this.handleEvent('exit'); // silent, since im considering exit optional
    this.state = newState;
    this.handleEvent('enter'); // silent, since im considering enter optional
    if(typeof(this.afterStateChange) != 'undefined') this.afterStateChange.call(this, newState, oldState);
    return this;
}
