// rafce

import React, { useState } from "react";

const DateSelect = ({ dateTime }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div id="dateSelect" className="pt-6">
      <div className="flex flex-col md:flex-row items-start gap-10 p-8 bg-primary/10 border border-primary/20 rounded-lg">
        <div>
          <p className="text-lg font-semibold mb-3">Choose Date</p>
          <div className="flex flex-wrap gap-4 text-sm">
            {Object.keys(dateTime).map((date) => (
              <button
                key={date}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTime(null); // reset giờ khi đổi ngày
                }}
                className={`px-4 py-2 rounded-md border transition ${
                  selectedDate === date
                    ? "bg-primary text-white"
                    : "bg-transparent border-primary text-primary hover:bg-primary/20"
                }`}
              >
                {date}
              </button>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div>
            <p className="text-lg font-semibold mb-3">Choose Time</p>
            <div className="flex flex-wrap gap-4 text-sm">
              {dateTime[selectedDate].map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-4 py-2 rounded-md border transition ${
                    selectedTime === time
                      ? "bg-primary text-white"
                      : "bg-transparent border-primary text-primary hover:bg-primary/20"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Hiển thị kết quả chọn */}
      {selectedDate && selectedTime && (
        <div className="mt-6 text-sm text-gray-300">
          ✅ Bạn đã chọn: <b>{selectedDate}</b> - <b>{selectedTime}</b>
        </div>
      )}
    </div>
  );
};

export default DateSelect;
