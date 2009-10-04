var undefinedState = "State is undefined";
var undefinedEvent = "Event is undefined";

function StateMachine(){
    this.stateMachine = true;
    this.state = false;
};
StateMachine.prototype.handleEvent = function(event){
    if(!this.state[event]) throw undefinedEvent;
    this.state[event].call(this);
}
StateMachine.prototype.changeState = function(state){
    if(!this.states[state]) return;
    if(this.state){
        this.handleEvent('exit');
    }
    this.state = this.states[state];
    this.handleEvent('enter');
}
