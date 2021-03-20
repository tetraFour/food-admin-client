let timeout;
let currentValue;

export function api(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function search() {
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/restaurants?restaurant=${currentValue}`
    )
      .then((response) => response.json())
      .then((result) => {
        if (currentValue === value) {
          const data = [];
          result.forEach((r) => {
            data.push({
              value: r.name,
              text: r.name,
            });
          });
          callback(data);
        }
      });
  }

  timeout = setTimeout(search, 1000);
}
