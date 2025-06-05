
document.addEventListener("DOMContentLoaded", function () {
  console.log("📅 Calendar JS Loaded");

  const monthSelect = document.querySelector("select:nth-of-type(2)");
  const yearSelect = document.querySelector("select:nth-of-type(1)");
  const calendarTable = document.querySelector(".calendar-table");
  const title = document.querySelector(".page-header h1");
  const prevBtn = document.querySelector(".calendar-top-controls button:nth-child(2)");
  const nextBtn = document.querySelector(".calendar-top-controls button:nth-child(1)");

  const hebrewMonths = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
  const hebrewDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

  const sampleEvents = {
    "2025-06-03": { client: "ליה נחום", time: "11:00", type: "מדידה" }
  };

  function getMonthDays(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDay(year, month) {
    return new Date(year, month, 1).getDay();
  }

  function renderCalendar(year, month) {
    calendarTable.innerHTML = "";

    for (let i = 0; i < 7; i++) {
      const cell = document.createElement("div");
      cell.style.cssText = "background:#f2f2f2;padding:1rem;text-align:center;font-weight:bold;border-left:1px solid #ddd;";
      cell.textContent = hebrewDays[i];
      calendarTable.appendChild(cell);
        if (calendarTable.children.length > 7) {
          cell.onmouseenter = () => {
            cell.style.backgroundColor = "#f9f9f9";
          };
          cell.onmouseleave = () => {
            cell.style.backgroundColor = "#fff";
          };
        }
    }

    const totalDays = getMonthDays(year, month);
    let firstDay = getFirstDay(year, month);
    let currentDay = 1;

    for (let row = 0; currentDay <= totalDays; row++) {
      for (let col = 0; col < 7; col++) {
        const cell = document.createElement("div");
        cell.style.cssText = "background:#fff;padding:0.8rem;min-height:80px;text-align:center;border-left:1px solid #eee;border-top:1px solid #eee;font-size:0.95rem;position:relative;";

        if (row === 0 && col < firstDay) {
          cell.textContent = "";
        } else if (currentDay <= totalDays) {
          const day = currentDay;
          const dateKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

          const dateNum = document.createElement("div");
          dateNum.textContent = day;
          dateNum.style.cssText = "font-weight:600;margin-bottom:0.3rem;";
          cell.appendChild(dateNum);

          if (sampleEvents[dateKey]) {
            const event = sampleEvents[dateKey];
            const badge = document.createElement("div");
            badge.innerHTML = `${event.time}<br>${event.client}<br><span style='font-weight:600;'>${event.type}</span>`;
            badge.style.cssText = "background:#eee;border-radius:6px;padding:0.3rem;font-size:0.8rem;line-height:1.3;margin-top:0.2rem;cursor:pointer;";
            badge.onclick = () => {
              const modal = document.createElement("div");
              modal.id = "popup-leah";
              modal.innerHTML = `
                <div style='position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:9999;'>
                  <div style='background:#fff;padding:2rem;border-radius:10px;width:90%;max-width:400px;text-align:center;position:relative;font-family:Assistant;'>
                    <h2 style='margin-top:0;'>פרטי הפגישה</h2>
                    <button onclick='document.getElementById("popup-leah").remove()'
                            style='position:absolute;top:1rem;left:1rem;background:none;border:none;font-size:1.4rem;cursor:pointer;'>×</button>
                    <div style='margin-top:2rem;'>
                      <p><strong>לקוחה:</strong> ליה נחום &nbsp; | &nbsp; <strong>סוג:</strong> מדידה</p>
                      <p><strong>תאריך:</strong> 3.6.2025 &nbsp; | &nbsp; <strong>שעה:</strong> 11:00</p>
                    </div>
                    <div style='display:flex;justify-content:center;gap:1rem;margin-top:2rem;'>
                      <button onclick="window.location.href='order-details.html?id=3001'" class='new-order-btn'>מעבר להזמנה</button>
                      <button onclick="window.location.href='clients-log.html?id=1021'" class='new-order-btn'>מעבר לפרטי לקוחה</button>
                    </div>
                  </div>
                </div>`;
              document.body.appendChild(modal);
            };
            cell.appendChild(badge);
          }

          currentDay++;
        }

        calendarTable.appendChild(cell);
        if (calendarTable.children.length > 7) {
          cell.onmouseenter = () => {
            cell.style.backgroundColor = "#f9f9f9";
          };
          cell.onmouseleave = () => {
            cell.style.backgroundColor = "#fff";
          };
        }
      }
    }

    title.textContent = `יומן פגישות - ${hebrewMonths[month]} ${year}`;
    yearSelect.value = year;
    monthSelect.value = hebrewMonths[month];
  }

  let currentYear = 2025;
  let currentMonth = 5;

  renderCalendar(currentYear, currentMonth);

  monthSelect.addEventListener("change", () => {
    currentMonth = hebrewMonths.indexOf(monthSelect.value);
    renderCalendar(currentYear, currentMonth);
  });

  yearSelect.addEventListener("change", () => {
    currentYear = parseInt(yearSelect.value);
    renderCalendar(currentYear, currentMonth);
  });

  nextBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentYear, currentMonth);
  });

  prevBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentYear, currentMonth);
  });
});
