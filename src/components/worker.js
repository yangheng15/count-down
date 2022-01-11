let timer = null;
this.onmessage = function (event) {
    const time = event.data;
    console.log(time);
    
    // getTime(this, time);
};

// function getTime(that: any, time: number) {
//     time && clearTimeout(timer);
//     if (time < 0) return;
//     // const { hh, mm, ss } = this.durationFormatter(time);
//     that.postMessage(time);
//     // this.hours = hh ?? 0;
//     // this.mins = mm ?? 0;
//     // this.seconds = ss;
//     timer = setTimeout(() => {
//         getTime(that, time - 1);
//     }, 1000);
// }
