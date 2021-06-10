// HOW TO USE

// 1rst - copy everything

// 2nd - launch registerDay for each day
// EX: registerDay('2021-05-14')
var ajaxURL =
  "https://inno3944.visualtime.net/VTLiveApi/Portal/PortalSvcx.svc/SaveRequestForbiddenPunch";
var headers = {
  roAuth: "[YOUR each login roAuth]",
  roToken: "[YOUR each login roToken]",
  roAlias: "[YOUR roAlias]",
  roApp: "VTPortal",
  roCompanyID: "[YOUR roCompanyID]",
  roSrc: "false",
};

function registerDay(date) {
  var day = new Date(date.toString());
  var weekDay = day.getDay();

  if (weekDay == 5) {
    registerTime(date, "09:00", "E").then(() =>
      registerTime(date, "15:00", "S")
    );
  } else if (weekDay > 0 && weekDay < 5) {
    registerTime(date, "09:00", "E")
      .then(() => registerTime(date, "14:00", "S"))
      .then(() => registerTime(date, "15:00", "E"))
      .then(() => registerTime(date, "18:30", "S"));
  }
}

/**
 *
 * @param date YYYY-MM-DD
 * @param hour HH:MM
 * @param direction E = Entrada | S = Salida
 */
function registerTime(date, hour, direction) {
  return new Promise(resolve => {
    return $.ajax({
      method: "POST",
      url: ajaxURL,
      enctype: "multipart/form-data",
      headers: headers,
      cache: false,
      processData: true,
      data: {
        punchDate: `${date} ${hour}`,
        idCause: -1,
        comments: "",
        direction: direction,
        acceptWarning: "false",
      },
    }).done(function (msg) {
      // console.log( "Data Saved: " + msg );
        setTimeout(() => {
          resolve();
        }, 3000)
    });
  })
}
