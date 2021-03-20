import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { test } from "../../store";

const TestPage = () => {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(`${year}-10-1`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  // const decrement = (a) => {
  //   test.decrement();
  // };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });
  return (
    <div>
      <h1>HacktoberFest {year} Countdown</h1>
      <h2>With React Hooks!</h2>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      <h3>{test.count}</h3>
      <button onClick={() => test.increment()}>+</button>
      <button onClick={() => test.decrement()}>-</button>
      <div>
        <label>
          <input
            type="checkbox"
            checked={test.checked}
            onChange={() => test.changeChecked()}
          />
          sort by name
        </label>
      </div>
      <div>
        <input
          type="text"
          placeholder="a-z"
          onChange={(e) => test.changeHandler(e)}
          value={test.text}
        />
      </div>
      <pre>{JSON.stringify(test.foodList, null, 2)}</pre>
    </div>
  );
};

export default observer(TestPage);
