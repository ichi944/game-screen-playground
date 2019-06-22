const sleep = (duration: number) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve();
    }, duration)
  );
export default sleep;
