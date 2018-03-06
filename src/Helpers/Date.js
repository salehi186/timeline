Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
  };
  
  Date.prototype.addWorkDays = function(days) {
    let cDate = new Date(this.valueOf());
    var step = 1;
    if (days > 0) step = -1;
    while (days !== 0) {
      cDate = cDate.addDays(-step);
      if ([5, 6].indexOf(cDate.getDay()) > -1) continue;
      days = days + step;
    }
    return cDate;
  };
  