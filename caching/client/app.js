const attachNoCacheListeners = () => {
  const sendBtn = document.getElementById("js-no-cache-send");
  const firstReqDd = document.getElementById("js-first-no-cache-dd");
  const followingReqDd = document.getElementById("js-folowing-no-cache-dd");

  let requestSent = 0;

  sendBtn.addEventListener('click', async () => {
    requestSent++;
    const res = await fetch("/no-cache");
    const requestCount = (await res.json()).count;
    if (requestSent === 1) {
      firstReqDd.innerText = requestCount;
      return;
    }
    followingReqDd.innerText = requestCount;
  })
}

attachNoCacheListeners();