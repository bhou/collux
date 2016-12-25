import StoreComponent from './StoreComponent';

class MemoryStoreComponent extends StoreComponent {
  constructor(options) {
    super(options);

    this._state = null;

    this.setStateGetter(function(){
      return this._state;
    });

    this.setStateSetter(function(state){
      this._state = state;
    });
  }
}

export default MemoryStoreComponent;


