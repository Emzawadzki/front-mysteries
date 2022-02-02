const attachNoCacheListeners = () => {
  const sendBtn = document.getElementById("js-no-cache-send");
  const firstReqDd = document.getElementById("js-first-no-cache-dd");
  const followingReqDd = document.getElementById("js-folowing-no-cache-dd");

  let requestsSent = 0;

  sendBtn.addEventListener('click', async () => {
    requestsSent++;
    const res = await fetch("/no-cache");
    const requestCount = (await res.json()).count;
    if (requestsSent === 1) {
      firstReqDd.innerText = requestCount;
      return;
    }
    followingReqDd.innerText = requestCount;
  })
}

const attachClientCacheListeners = () => {
  const sendBtn = document.getElementById("js-client-cache-send");
  const firstReqDd = document.getElementById("js-first-client-cache-dd");
  const followingReqDd = document.getElementById("js-folowing-client-cache-dd");
  const timer = document.getElementById("js-client-cache-timer");

  let timerInterval;
  let timeCounter;
  let requestsSent = 0;

  const resetTimer = () => {
    if (timerInterval) clearInterval(timerInterval);
    timeCounter = 30;
    timer.innerText = `${timeCounter}s`;
    timerInterval = setInterval(updateTimer, 1_000);
  }

  const updateTimer = () => {
    if (timeCounter > 0) {
      timeCounter--;
      timer.innerText = `${timeCounter}s`;
    }
  }

  sendBtn.addEventListener('click', async () => {
    requestsSent++;
    const res = await fetch("/client-cache", {
      headers: {
        "Cache-Control": "max-age=30"
      }
    });
    const requestCount = (await res.json()).count;
    if (requestsSent === 1) {
      resetTimer();
      firstReqDd.innerText = requestCount;
      return;
    }
    followingReqDd.innerText = requestCount;
  })
}

const attachServerCacheListeners = () => {
  const sendBtn = document.getElementById("js-server-cache-send");
  const firstReqDd = document.getElementById("js-first-server-cache-dd");
  const followingReqDd = document.getElementById("js-folowing-server-cache-dd");
  const timer = document.getElementById("js-server-cache-timer");

  let timerInterval;
  let timeCounter;
  let requestsSent = 0;

  const resetTimer = () => {
    if (timerInterval) clearInterval(timerInterval);
    timeCounter = 30;
    timer.innerText = `${timeCounter}s`;
    timerInterval = setInterval(updateTimer, 1_000);
  }

  const updateTimer = () => {
    if (timeCounter > 0) {
      timeCounter--;
      timer.innerText = `${timeCounter}s`;
    }
  }

  sendBtn.addEventListener('click', async () => {
    requestsSent++;
    const res = await fetch("/server-cache");
    const requestCount = (await res.json()).count;
    if (requestsSent === 1) {
      resetTimer();
      firstReqDd.innerText = requestCount;
      return;
    }
    followingReqDd.innerText = requestCount;
  })
}

attachNoCacheListeners();
attachClientCacheListeners();
attachServerCacheListeners();
