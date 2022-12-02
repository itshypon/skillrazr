
const events: any = {};
const monitior = {
    events: events,
    on: function (eventName:string, fn: () => void) {
      this.events[eventName] = this.events[eventName] || [];
      this.events[eventName].push(fn);
    },
    off: function(eventName:string, fn: () => void) {
      if (this.events[eventName]) {
        for (var i = 0; i < this.events[eventName].length; i++) {
          if (this.events[eventName][i] === fn) {
            this.events[eventName].splice(i, 1);
            break;
          }
        };
      }
    },
    emit: function (eventName:string, data:any) {
      if (this.events[eventName]) {
        this.events[eventName].forEach(function(fn:(b: any) => void) {
          fn(data);
        });
      }
    }
  };

  export default monitior;